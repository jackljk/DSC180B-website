---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: page
---
# Emulating the Effect of Climate Change with Deep Learning


<!-- Interactive Map -->
Temp interactive map placeholder
<div style="text-align:center">
<img src="assets/images/temp map.png">
</div>
Will contain D3 map of CMIP6 data as an introduction into what we are comparing and predicting

## Introduction

What you just played around with is the combined predictions of what the Earth's climate will look like based on the climate models present in CMIP6 (Coupled Model Intercomparison Project Phase 6). They gathered the results of 134 different climate models, each of which were built upon different assumptions, but all of whom use a large amount of computational resources to attempt to model the behaviour of Earth's climate in response to greenhouse gas emissions. The goal of these Earth System Models is to attempt to give as much information about the potential future of Earth's climate to policy makers in order for us as a collective to be able to make sustainable choices to prevent drastic climate changes. But with so many different possible scenarios, using these ESMs to model every single socioeconomic pathway is too computationally expensive and time consuming. With these three deep learning models, we hope to create climate emulators that are both accurate and inexpensive to run.

## Data
The input data for our three machine learning models are from the Norwegian Earth System Model, which is generated from NorESM2 model and contains historical and future emission data. This generated dataset also is a part of the sixth coupled model intercomparison project. The data is multi-dimensional and set up in xarray table format, which includes emission data of CO<sub>2</sub>, SO<sub>2</sub>, CH<sub>4</sub>, and Black Carbon from different time, longitudes, and latitudes.

## Models


### Deep Kernel Learning 
Deep Kernel Learning is a hybrid model using the expressiveness of a Neural Network and combining it with the probabilistic modeling of a Gaussian Process. This is done by using the Neural Network to learn the parameters of the kernel function of the Gaussian Process, which is possible due to neural networks abiltiy to learn complex non-linear functions. Which improves the predictive performance of the Gaussian Process.

**Here is a graphical depiction of a  Deep Kernel Learning Model**
<object type="image/svg+xml" data="assets/svgs/graph.svg">Your browser does not support SVG</object>


### XGBoost
The XGBoost technique stands for "Extreme Gradient Boosting" and is a scalable tree-boosting system. It has become popular in these years since it has won many Kaggle competitions with higher accuracy and higher efficiency. XGBoost integrates the predictions from multiple decision trees like Random Forest, but it combines multiple machine learning algorithms to boost the decision trees, such as gradient descent, linear regression with regularization, and "exact greedy algorithms". We can say it's like a stronger version of Random Forest The model predicts the final results by the weighted sum of predictions of all decision trees. Unlike Random Forest, the boosting process minimizes the bias and reduces the overfitting.


### PINN

One of the best performing deep learning models for many tasks is the Neural Network, for our case, the Convolutional Neural Network. While it has been traditionally used for image recognition tasks, by slicing the data into images of aerosol distribution over time, a basic CNN architechture was created by Professor Duncan Watson Parris that emulated Earth's climate pretty accurately. To improve upon it and to increase explanability of how the model functions, our Physics informed neural network incorporates physical constraints brought on by known physical equations. Currently, there is no one known set of equations that is used to model the relationbetween the aerosols being released and the temperature and precipitation, but previous work done on Finite amplitude Impulse Response (FaIR) models (Leach et al. 2021) have proposed a set of ordinary differential equations that they have proven to be adequate in modeling the relation between emissions of greenhouse gases and mean climate response. By incorporating these equations into the existing loss function of the original CNN architecture outlined in ClimateBench, the resulting PINN will produce results that are more robust and physically constrained.

<img src="assets/images/temp map.png">
Will contain image of how PINN is built

## Results
### Interactive Map

Temp interactive map placeholder

<div style="text-align:center">
<img src="assets/images/temp map.png">
</div>

Will contain D3 map of results from the models (mean throughout a set number of years with interactive zoom and buttons to select the model and the variable to display)



### Tables of Results
Displayed are the results of the models using special evaluation metrics to describe the spatial variability and the global variability of the predictions to more accurately compare the models. 

$$
\begin{equation}
    NRMSE_s = \sqrt{\langle(|x_{i, j, t}|_t - |y_{i, j, t, n}|_{n, t})^2\rangle}/|\langle y_{i, j}\rangle|_{t, n}
\end{equation}
$$

$$
\begin{equation}
    NRMSE_g = \sqrt{|(\langle x_{i, j, t}\rangle - \langle|y_{i, j, t, n}|_n\rangle)^2|_t} / |\langle y_{i, j} \rangle|_{t, n}
\end{equation}
$$

$$
\begin{equation}
    NRMSE_t = NRMSE_s + \alpha \times NRMSE_g
\end{equation}
$$

##### Gaussian Process

Model | Base Gaussian Process | Gaussian Process with Deep Kernel learning  | Difference | 
--- | --- | --- | ---
Spatial | lorem ipsum | lorem ipsum dolor | lorem ipsum dolor sit
Global | lorem ipsum dolor sit amet consectetur | lorem ipsum dolor sit amet | lorem ipsum dolor sit
Total | lorem ipsum | lorem | lorem ipsum

##### Neural Networks

Model | Base Convoluted Neural Network | Physics Informed Neural Network  | Difference | 
--- | --- | --- | ---
Spatial | lorem ipsum | lorem ipsum dolor | lorem ipsum dolor sit
Global | lorem ipsum dolor sit amet consectetur | lorem ipsum dolor sit amet | lorem ipsum dolor sit
Total | lorem ipsum | lorem | lorem ipsum

##### Forests

Model | Base Random Forest | XGBoost  | Difference | 
--- | --- | --- | ---
Spatial | lorem ipsum | lorem ipsum dolor | lorem ipsum dolor sit
Global | lorem ipsum dolor sit amet consectetur | lorem ipsum dolor sit amet | lorem ipsum dolor sit
Total | lorem ipsum | lorem | lorem ipsum

## Discussion


## Conclusion