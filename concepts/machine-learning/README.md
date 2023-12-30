# Machine Learning

This project contains notes, learnings, and examples of machine learning models and how to apply them.

## Regression Models

### Types of Regression Models

#### Simple Linear Regression

This can be used if the dataset has a simple linear distribution that a linear line could fit well inside.

#### Multiple Linear Regression

This can be used if the dataset also has a linear distribution but with multiple variables.

#### Polynomial Linear Regression

This can be used if the dataset has a more parabolic distribution where a parabolic line would have the best fit. Sometimes these are used to see how epidemics or pandemics spread across a population.

This is still called linear because the coefficients are linear even though the equation is not.

### 5 Methods of Building a Model

The five methods are:

- All-in
- Backward Elimination
- Forward Selection
- Bidirectional Elimination
- Score Comparison

#### All-in

All-in is a method where you simply use all the variables or datapoints from your dataset to train and predict. This method should really only be used if you have some prior knowledge that these variables are actually the ones you want to use as predictors. The other case when you would use this is if you wanted to prepare for backward elimination, the next method.

#### Backward Elimination

**Step 1**: Select a significance level to stay in the model (e.g. `SL = 0.05`)
**Step 2**: Fit the model with all possible predictors (the all-in approach)
**Step 3**: Consider the predictor with the **highest** P-value. If `P > SL`, go to step 4, otherwise move on.
**Step 4**: Remove that predictor, the one with the highest P-value.
**Step 5**: Fit the model without that variable. Then repeat and go back to step 3.

Eventually you should find that the variable with the highest P-value is lower than SL. If that is the case, then your model is ready to go.

#### Forward Selection

**Step 1**: Select a significance level to enter in the model (e.g. `SL = 0.05`)
**Step 2**: Fit all simple regression models `y ~ Xn`. Select the one with the lowest P-value.
**Step 3**: Keep the variable and fit all possible models with an extra predictor + the one you found previously.
**Step 4**: Consider the predictor with the lowest P-value. If `P < SL`, go back to step 3, other your model is finished.

This grows the regression model with one variable at a time until it your model goes over the significance level.

#### Bidirectional Elimination

This method combines the previous two methods.

**Step 1**: Select a significance level to enter and stay in the model `SL_ENTER = 0.05`, `SL_STAY = 0.05`.
**Step 2**: Perform the next step of the forward selection method. (new variables must have `P < SL_ENTER` to enter)
**Step 3**: Perform all of the steps of the backward elimination process. (old variables must have `P < SL_STAY` to stay)
**Step 4**: Add some point no new variables can enter and no existing variables can exit. Once you hit that case, the model is finished.

#### Score Comparison (All Possble Models)

**Step 1**: Select a criteria of goodness of fit (e.g. Akaike criterion)
**Step 2**: Construct all possble regression models
**Step 3**: Select the model with the best criteria.

This method is the most resource intensive and requires many iterations. If you have 10 columns you would produce 1,023 models as an example. This is not usually the recommended approach.

## Classification Models
