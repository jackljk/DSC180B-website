---
layout: page
title: Appendix
permalink: /appendix/
---

### Deep Kernel Learning 
More details on Deep Kernel Learning and it's technical details,

#### Brief Technical Details
The general equation for Deep Kernel Learning is given as

$$
\begin{equation}
    k(x_i, x_j |\theta) \rightarrow k(g(x_i, w), g(x_j, w)|\theta, w)
\end{equation}
$$

where $g(x_i, w)$ is a non-linear mapping of the weights, given by the feed foward of the Deep Neural Network e.g a Convolutional Neural Network which are parameterized by the weights $w$. 

The loss is then back propagated via the <strong>log marginal likelihood</strong> for the network to learn the feature representation, which is given as,

$$
\begin{equation}
    \log p(\mathbf{y} | \mathbf{X}) = -\frac{1}{2} \mathbf{y}^\top (K + \sigma^2_n I)^{-1} \mathbf{y} - \frac{1}{2} \log |K + \sigma^2_n I| - \frac{n}{2} \log 2\pi
\end{equation}
$$

and the derivative of the loss is computed using the chain rule, which gives an implicit derivative with respect to the $n x n$ covariance matrix as follows,

$$
\begin{equation}
    \frac{\partial \mathcal{L}}{\partial K_{\gamma}} = \frac{1}{2}(K^{-1}_{gamma}yy^TK^{-1}_{\gamma}-K^{-1}_{\gamma})
\end{equation}
$$

for a more in-depth understanding of the Deep Kernel Learning, refer to the paper by [Wilson et al.](https://arxiv.org/abs/1511.02222).

#### Deep Kernel Learning Structure
After data pre-processing, first we define the custom kernel function which will take in a `feature_extractor` which is the output from the neural network. 

```python
class DeepKernel(gpflow.kernels.Kernel):
    def __init__(self, feature_extractor, base_kernel, input_dim):
        super().__init__()
        self.feature_extractor = feature_extractor
        self.base_kernel = base_kernel
        self.input_dim = input_dim

    def K(self, X, X2=None):
        # Transform X and X2 using the neural network
        X_transformed = self.feature_extractor(X)
        X2_transformed = self.feature_extractor(X2) if X2 is not None else X2
        # Compute the kernel using the transformed inputs
        return self.base_kernel(X_transformed, X2_transformed)

    def K_diag(self, X):
        X_transformed = self.feature_extractor(X)
        return self.base_kernel.K_diag(X_transformed)
```

Then during the train, we initialize the 'DeepKernel' with an arbitrary kernel built in to GPFlow to guide the Deep Kernel Learning process in the right direction. Which is then connected to a **GPR** (Gaussian Process Regression) from GPFlow. For more information about GPFlow refer to G[GPFlow](https://gpflow.readthedocs.io/en/v1.5.1-docs/notebooks/advanced/kernels.html).

#### Best Model Hyperparameters
Due to randomness there is the possibility of other hyper-parameter combinations being slightly better than the ones listed here, but overall these gave me the best results for each variable, as seen below.


| Parameters              | Temperature | Diurnal Temperature Range | Precipitation | 90th Precipitation |
|-------------------------|-------------|--------------------------|---------------|---------------------|
| Kernel                  | Matern52    | Matern52                 | Matern52      | Squared Exponential |
| Learning Rate           | 0.01        | 0.001                    | 0.001         | 0.01                |
| Input Dimensions        | 256         | 256                      | 128           | 128                 |
| Output Dimensions       | 36          | 60                       | 24            | 12                  |
| Activation              | Sigmoid     | Sigmoid                  | Sigmoid       | Sigmoid             |
| Dropout Probability     | 0.5         | 0.5                      | 0.5           | 0.5                 |
| Dropout                 | False       | False                    | False         | True                |
| Batch Normalization     | False       | True                     | False         | False               |
| Active Dimensions       | 1           | 2                        | 2             | 1                   |

### Additional Figures for the Deep Kernel Learning Model
#### Timeseries of Global Mean from years 2015-2100
In the figure below shows the plot for the global mean average timeseries, weighing the small grid sizes for the poles over the years 2015-2100. Comparing it with the NorESM2 Model and the Model from the reproduction.

![Timeseries of Global Mean](/DSC180B-website/assets/images/DKL_global_mean_timeseries.png)


#### Deep Kernel Learning Time Series with uncertainty

In the figure below, we can see the timeseries plotted with the uncertainty obtained from the Gaussian Process. One interesting thing to note is that for the Temperature variable, the uncertainty not only covers all of the NorESM2 variations but also has a relatively small variance, capturing the underlying patterns well. However, for the other variables, the variance is large, making it difficult to interpret the uncertainty.

![Deep Kernel Learning Time Series with uncertainty](/DSC180B-website/assets\images\dkl_timeseries_with_uncertainty.png)