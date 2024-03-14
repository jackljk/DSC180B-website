---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: page
title: Emulating the Effect of Climate Change with Deep Learning
---

## Introduction
What you just played around with is the combined predictions of what the Earth's climate will look like based on the climate models present in CMIP6 (Coupled Model Intercomparison Project Phase 6). They gathered the results of 134 different climate models, each of which were built upon different assumptions, but all of whom use a large amount of computational resources to attempt to model the behaviour of Earth's climate in response to greenhouse gas emissions. The goal of these Earth System Models is to attempt to give as much information about the potential future of Earth's climate to policy makers in order for us as a collective to be able to make sustainable choices to prevent drastic climate changes. But with so many different possible scenarios, using these ESMs to model every single socioeconomic pathway is too computationally expensive and time consuming. With these three deep learning models, we hope to create climate emulators that are both accurate and inexpensive to run.

<div style="text-align:center">
<select id="NorESM_Var_select" onchange="changeModelNorESM()">
  <option value="NorESM_tas">Temperature</option>
  <option value="NorESM_dtr">Diurnal Temperature Range</option>
  <option value="NorESM_pr">Precipitation</option>
  <option value="NorESM_pr90">90th Percentile Precipitation</option>
</select>



<div id="NorESM_tas" class="NorESM_map">{%- include interactive_models/NorESM/tas_map.html -%}</div>
<div id="NorESM_dtr" class="NorESM_map hidden">{%- include interactive_models/NorESM/dtr_map.html -%}</div>
<div id="NorESM_pr" class="NorESM_map hidden">{%- include interactive_models/NorESM/pr_map.html -%}</div>
<div id="NorESM_pr90" class="NorESM_map hidden">{%- include interactive_models/NorESM/pr90_map.html -%}</div>
</div>


## Data
The input data for our three machine learning models are from the Norwegian Earth System Model, which is generated from NorESM2 model and contains historical and future emission data. This generated dataset also is a part of the sixth coupled model intercomparison project. The data is multi-dimensional and set up in xarray table format, which includes emission data of CO<sub>2</sub>, SO<sub>2</sub>, CH<sub>4</sub>, and Black Carbon(BC) from a different time, longitudes, and latitudes.

<table>
    <thead>
        <tr>
            <th><strong>Input Variables</strong></th>
            <th><strong>Output Variables</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>CO<sub>2</sub></td>
            <td>Temperature</td>
        </tr>
        <tr>
            <td>SO<sub>2</sub></td>
            <td>Daily Diurnal Temperature Range</td>
        </tr>
        <tr>
            <td>CH<sub>4</sub></td>
            <td>Precipitation</td>
        </tr>
        <tr>
            <td>Black Carbon (BC)</td>
            <td>90<sup>th</sup> Percentile Precipitation</td>
        </tr>
    </tbody>
</table>

### Preprocessing for Deep Kernel Learning / Gaussian Process 
We can see from the cleaned data for the Deep Kernel Learning and Gaussian Process models, for CO<sub>2</sub> and CH<sub>4</sub> there is only 1 dimension, and for SO<sub>2</sub> and BC has 5 dimensions. The reason for this is because SO<sub>2</sub> and BC would only stay in the atmosphere for a few days to a week. While CH<sub>4</sub> would stay in the atmosphere for years and millennia for CO2. This is why they have more dimensions, as they would be out of our atmosphere before they get mixed completely into our environment and have a global effect. Hence, the dimensions give us the distributions of SO2 and BC to account for where they are being emitted. We do this in order to maintain the spatial and temporal variability of the emissions which otherwise could be lost due to the high dimensionality of the data and Gaussian Process's inability to handle high dimensional data.



## Models


### Deep Kernel Learning
Deep Kernel Learning is a hybrid model using the expressiveness of a Neural Network and combining it with the probabilistic modeling of a Gaussian Process. This is done by using the Neural Network to learn the parameters of the kernel function of the Gaussian Process, which is possible due to neural networks abiltiy to learn complex non-linear functions. Which improves the predictive performance of the Gaussian Process.

**Here is a graphical depiction of a  Deep Kernel Learning Model**
<div style="display: flex; justify-content: center;">
  <object type="image/svg+xml" data="assets/svgs/graph.svg" width="500" height="500">Your browser does not support SVG</object>
</div>

Looking at the figure, we first have the input data, X, which then goes through hidden layers, which in the neural network portion of the hybrid model. In this process, the neural network basically learns a representation and underlying patterns of the data. Which is then fed into the parametric layer, kernelizing the neural networks representation to be used in the Gaussian Process, which using the learned representation, learns the underlying distribution of the training data. This is then used to make predictions on the test data. 

For building the mode, we initializing the kernels, following the approach outlined in Climate Bench V1.0, we assgined a distinct kernel for each input dimension to guide the Deep Neural Network towards more favorable outcomes and preventing the model from converging to suboptimal minima. Next, we will then perform a grid search to choose the best hyperparameters for the model. For more information on the training process, please refer to the training section in the appendix.



### XGBoost
The XGBoost technique stands for "Extreme Gradient Boosting" and is a scalable tree-boosting system. It has became popular in these years since it has won many Kaggle competitions with higher accuracy and higher efficiency. XGBoost integrates the predictions from multiple decision trees like Random Forest, but it combines multiple machine learning algorithms to boost the decision trees, such as gradient descent, linear regression with regularization, and "exact greedy algorithms". We can say it's like a stronger version of Random Forest The model predict the final results by weighted sum of predictions of all decision trees. Unlike Random Forest, the boosting porcess minimizes the bias and reduce the overfitting.

<img src="assets/images/xgboost.png">

### PINN
One of the best performing deep learning models for many tasks is the Neural Network, for our case, the Convolutional Neural Network. While it has been traditionally used for image recognition tasks, by slicing the data into images of aerosol distribution over time, a basic CNN architechture was created by Professor Duncan Watson Parris that emulated Earth's climate pretty accurately. To improve upon it and to increase explanability of how the model functions, our Physics informed neural network incorporates physical constraints brought on by known physical equations. Currently, there is no one known set of equations that is used to model the relationbetween the aerosols being released and the temperature and precipitation, but previous work done on Finite amplitude Impulse Response (FaIR) models (Leach et al. 2021) have proposed a set of ordinary differential equations that they have proven to be adequate in modeling the relation between emissions of greenhouse gases and mean climate response. By incorporating these equations into the existing loss function of the original CNN architecture outlined in ClimateBench, the resulting PINN will produce results that are more robust and physically constrained.

<img src="assets/images/temp map.png">
Will contain image of how PINN is built

## Results
### Interactive Map

Temp interactive map placeholder

<div style="text-align:center">
<select id="models_select" onchange="changeModel()">
  <option value="CNN">CNN</option>
  <option value="PINN">PINN</option>
  <option value="RF">Random Forest</option>
  <option value="XG">XGBoost</option>
  <option value="GP">Gaussian Process</option>
  <option value="DKL">Deep Kernel Learning</option>
</select>
<select id="variable_select" onchange="changeModel()">
  <option value="tas">Average Surface Temperature</option>
  <option value="dtr">Diurnal Temperature Range</option>
  <option value="pr">Precipitation</option>
  <option value="pr90">90th Percentile Precipitation</option>
</select>
<div id="CNN_tas" class="models">{%- include interactive_models/CNN/CNN_tas.html -%}</div>
<div id="CNN_dtr" class="models hidden">{%- include interactive_models/CNN/CNN_dtr.html -%}</div>
<div id="CNN_pr" class="models hidden">{%- include interactive_models/CNN/CNN_pr.html -%}</div>
<div id="CNN_pr90" class="models hidden">{%- include interactive_models/CNN/CNN_pr90.html -%}</div>

<div id="PINN_tas" class="models hidden">{%- include interactive_models/PINN/PINN_tas.html -%}</div>
<div id="PINN_dtr" class="models hidden">{%- include interactive_models/PINN/PINN_dtr.html -%}</div>
<div id="PINN_pr" class="models hidden">{%- include interactive_models/PINN/PINN_pr.html -%}</div>
<div id="PINN_pr90" class="models hidden">{%- include interactive_models/PINN/PINN_pr90.html -%}</div>

<div id="RF_tas" class="models hidden">{%- include interactive_models/RF/RF_tas.html -%}</div>
<div id="RF_dtr" class="models hidden">{%- include interactive_models/RF/RF_dtr.html -%}</div>
<div id="RF_pr" class="models hidden">{%- include interactive_models/RF/RF_pr.html -%}</div>
<div id="RF_pr90" class="models hidden">{%- include interactive_models/RF/RF_pr90.html -%}</div>

<div id="XG_tas" class="models hidden">{%- include interactive_models/XGB/XG_tas.html -%}</div>
<div id="XG_dtr" class="models hidden">{%- include interactive_models/XGB/XG_dtr.html -%}</div>
<div id="XG_pr" class="models hidden">{%- include interactive_models/XGB/XG_pr.html -%}</div>
<div id="XG_pr90" class="models hidden">{%- include interactive_models/XGB/XG_pr90.html -%}</div>

<div id="GP_tas" class="models hidden">{%- include interactive_models/GP/GP_tas.html -%}</div>
<div id="GP_dtr" class="models hidden">{%- include interactive_models/GP/GP_dtr.html -%}</div>
<div id="GP_pr" class="models hidden">{%- include interactive_models/GP/GP_pr.html -%}</div>
<div id="GP_pr90" class="models hidden">{%- include interactive_models/GP/GP_pr90.html -%}</div>

<div id="DKL_tas" class="models hidden">{%- include interactive_models/DKL/DKL_tas.html -%}</div>
<div id="DKL_dtr" class="models hidden">{%- include interactive_models/DKL/DKL_dtr.html -%}</div>
<div id="DKL_pr" class="models hidden">{%- include interactive_models/DKL/DKL_pr.html -%}</div>
<div id="DKL_pr90" class="models hidden">{%- include interactive_models/DKL/DKL_pr90.html -%}</div>
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

##### Gaussian Process vs. Gaussian Process with Deep Kernel Learning

<table>
    <thead>
        <tr>
            <th>Model</th>
            <th colspan="3">Deep Kernel Learning</th>
            <th colspan="3">GP from Reproduction</th>
            <th colspan="3">Difference</th>
        </tr>
        <tr>
            <th>Variable</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TAS</td>
            <td>0.0458</td>
            <td>0.0752</td>
            <td>0.3044</td>
            <td>0.0437</td>
            <td>0.0906</td>
            <td>0.3089</td>
            <td>0.0021</td>
            <td>-0.0154</td>
            <td>-0.0045</td>
        </tr>
        <tr>
            <td>DTR</td>
            <td>1.5602</td>
            <td>8.4860</td>
            <td>16.2872</td>
            <td>2.6495</td>
            <td>9.1950</td>
            <td>22.4425</td>
            <td>-1.0893</td>
            <td>-0.7090</td>
            <td>-6.1553</td>
        </tr>
        <tr>
            <td>PR</td>
            <td>0.3169</td>
            <td>2.4195</td>
            <td>4.0041</td>
            <td>0.3784</td>
            <td>2.3301</td>
            <td>4.2223</td>
            <td>-0.0615</td>
            <td>0.0894</td>
            <td>-0.2182</td>
        </tr>
        <tr>
            <td>PR90</td>
            <td>0.4133</td>
            <td>2.4919</td>
            <td>4.5582</td>
            <td>0.3955</td>
            <td>2.6048</td>
            <td>4.5821</td>
            <td>0.0178</td>
            <td>-0.1129</td>
            <td>-0.0239</td>
        </tr>
    </tbody>
</table>


##### Convoluted Neural Networks vs. Physics Informed Neural Network

<table>
    <thead>
        <tr>
            <th>Model</th>
            <th colspan="3">PINN</th>
            <th colspan="3">CNN from Reproduction</th>
            <th colspan="3">Difference</th>
        </tr>
        <tr>
            <th>Variable</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TAS</td>
            <td>0.0428</td>
            <td>0.1021</td>
            <td>0.3164</td>
            <td>0.0440</td>
            <td>0.0966</td>
            <td>0.3167</td>
            <td>-0.0012</td>
            <td>0.0055</td>
            <td>-0.0003</td>
        </tr>
        <tr>
            <td>DTR</td>
            <td>0.9371</td>
            <td>8.3310</td>
            <td>13.0166</td>
            <td>1.2263</td>
            <td>8.4313</td>
            <td>14.5632</td>
            <td>-0.2892</td>
            <td>-0.1003</td>
            <td>-1.5466</td>
        </tr>
        <tr>
            <td>PR</td>
            <td>0.1998</td>
            <td>2.1588</td>
            <td>3.1582</td>
            <td>0.1776</td>
            <td>2.2642</td>
            <td>3.1526</td>
            <td>0.0222</td>
            <td>-0.1054</td>
            <td>0.0056</td>
        </tr>
        <tr>
            <td>PR90</td>
            <td>0.3159</td>
            <td>2.7057</td>
            <td>4.2857</td>
            <td>0.3726</td>
            <td>2.5163</td>
            <td>4.3796</td>
            <td>-0.0567</td>
            <td>0.1894</td>
            <td>-0.0939</td>
        </tr>
    </tbody>
</table>


##### Random Forest vs. XGBoost

<table>
    <thead>
        <tr>
            <th>Model</th>
            <th colspan="3">XGBoost</th>
            <th colspan="3">Random Forest from Reproduction</th>
            <th colspan="3">Difference</th>
        </tr>
        <tr>
            <th>Variable</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
            <th>Global</th>
            <th>Spatial</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TAS</td>
            <td>0.1367</td>
            <td>0.2273</td>
            <td>0.9107</td>
            <td>0.3979</td>
            <td>0.4525</td>
            <td>2.4419</td>
            <td>-0.3044</td>
            <td>-0.2746</td>
            <td>-1.7965</td>
        </tr>
        <tr>
            <td>DTR</td>
            <td>2.8948</td>
            <td>10.5215</td>
            <td>24.9953</td>
            <td>2.7712</td>
            <td>13.1610</td>
            <td>27.0172</td>
            <td>0.1213</td>
            <td>-1.9044</td>
            <td>-1.2981</td>
        </tr>
        <tr>
            <td>PR</td>
            <td>0.3851</td>
            <td>4.0115</td>
            <td>5.9368</td>
            <td>0.9235</td>
            <td>5.5991</td>
            <td>10.2167</td>
            <td>-0.5828</td>
            <td>-2.2157</td>
            <td>-5.1300</td>
        </tr>
        <tr>
            <td>PR90</td>
            <td>0.3745</td>
            <td>4.7913</td>
            <td>6.6639</td>
            <td>0.9955</td>
            <td>6.7342</td>
            <td>11.7122</td>
            <td>-0.4744</td>
            <td>-0.8491</td>
            <td>-3.2214</td>
        </tr>
    </tbody>
</table>

## Conclusion
To move forward from ClimateBench, we aim to extend the three baseline models Gaussian Process, Random Forest, and CNN to predict various climate data by given aerosol emission input data. We applied Deep Kernel Learning, XGBoost, and PINN to improve the above three baseline models. Most of the new models beat up the scores of the baseline models from ClimateBench. The Physics Informed Neural Network has the best scores among of the model. By looking at the predictions, policymakers and the general public can assess which emission pathway is most suitable for achieving the goal of reducing global warming. In the future field of climate science, various techniques and algorithms of Deep Learning models are waiting for people to explore and research. Therefore, people can learn which emission path is most suitable for reducing the effect of climate change, and create a better environment for all.
