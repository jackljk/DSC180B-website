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

<img src="assets/images/temp map.png">

Will contain D3 map of CMIP6 data as an introduction into what we are comparing and predicting


## Introduction


## Data


## Models


### Deep Kernel Learning

### XGBoost

### PINN

## Results
### Interactive Map

Temp interactive map placeholder

<img src="assets/images/temp map.png">

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