---
title: Surveys measure what people do, not what people think
author: Schaun Wheeler
layout: post
permalink: /2012/04/13/surveys-measure-what-people-do-not-what-people-think/
jabber_published:
  - 1334328395
tagazine-media:
  - 'a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:8:"20450928";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2012-04-13 14:46:26";}'
email_notification:
  - 1334328397
categories:
  - Analysis
  - Assumptions
  - Data Collection
  - Design
  - Interpretation
tags:
  - measurement error
  - R
  - reliability
  - research
  - scales
  - self reports
  - social science
  - survey
  - validity
---
In my [previous post][1], I wrote about ways scale choice could distort the ways survey results portray the things they are supposed to measure. This certainly isn’t a new issue – researchers who use surveys often go to great lengths to ensure that their surveys are [valid and reliable][2], which in this context usually means “consistent.” Questions about reliability are a whole lot easier to answer than questions about validity. A survey is reliable if you can have the same people take it multiple times or put the questions in a different order and still get roughly the same answers, or if people who repeatedly rate certain items high also repeatedly rate other items low. There are all kinds of research designs and methods for assessing reliability.<!--more-->

With validity, the procedures aren’t as robust.  The most basic measure of validity is “[face validity][3]” which generally amounts to looking at the survey and saying “it looks ok to me…” Or you can go for what’s sometimes called “content validity” and give the survey to a bunch of people who by some measure are considered [experts][4] regarding the survey’s subject matter, and hope that they will look at it and say “it looks ok to me…” Or you can treat a [previously-constructed][5] survey as an expert of sorts and administer both your survey and the already-in-use survey and see if they give similar results. That requires you to assume that the survey to which you are comparing yours is actually valid when in fact it may just be popular.

The only really robust way to assess the validity of a survey is to use responses to the survey to predict actual behaviors (not just self-reports of behaviors) over time, all while demonstrating that (1) the behavior of saying certain things on a survey, and (2) the behavior of doing something at some point after taking a survey, are not actually just two different flavors of the same behavior. (When survey responses predict engagement in behavior, that’s interesting. When engagement in a behavior predicts more of the same, that’s not so interesting). Robust measures of validity require us to be really good at validly defining different types of behavior, which is something that, historically speaking, we social and behavioral scientists [haven’t been very good at][6].

So I took a different approach to assessing validity that is frequently used in a variety of other fields but not often used, as far as I have seen, in assessing survey scales. I created a quality index that ranged from 0 to 100. So if the survey was supposed to assess the usefulness of a product, 100 would mean the product was as useful as any product could be, and 0 would mean the product was entirely useless. I then simulated respondents who used various rating scales – ranging from 2-point to 11-point and varying in terms of whether the scales had a clearly defined neutral point in the middle – to rate things that fit all along the quality index.

If you want more specifics than that, including the R code I used to run the simulation, you can check out the [original post][1]. I used a correlation coefficient to measure the degree to which the aggregated ratings matched the quality index. I used the mean absolute error to estimate by how much the aggregated ratings failed to match the quality index. And then I rigged up a quick balance heuristic to estimate systematic bias – cases where the survey ratings overestimated items that were above the median on the quality index, but not the items that were below the median.

It’s that potential for systematic bias that makes me worry about the fact that it’s relatively easy to measure reliability but relatively hard to measure validity. A survey could yield entirely consistent results across multiple populations and times and survey formats, and those results could still poorly match the thing that the survey was supposed to measure in the first place. That is, in fact, what the simulation showed for most scale types. All scales that had more than four rating categories (and most that had more than three) ended up consistently overestimating items on one part of the quality index but consistently underestimating items on the opposite part of the index. That means we could expect those scales to yield consistent results that would be nevertheless quite difficult to meaningfully interpret, because the difference between, say, an average rating of 8.5 and 9.5 on a one-to-eleven scale would mean something quite different than the difference between an average rating of 5.5 and 6.5 on the exact same scale.

I concluded that, as a general rule, we were probably better off sticking to 2- and 3-point scales that had definite neutral points on them (in the case of the 2-point scale, respondents would not be able to actually select the neutral point, but they would be aware that the two options were opposites of one another).

There is, of course, another option, which several readers pointed out. We could take a scale with lots of options, have people rate items using that scale, and then re-code their answers to make the scale smaller. For example, we could use a seven-point scale but then combine the 1<sup>st</sup> and 2<sup>nd</sup> options and the 6<sup>th</sup> and 7<sup>th</sup> options to turn it into a 5-point scale. The potential benefit of this approach would be to capture greater nuance in people’s responses but also collapse that nuance in cases where differences in responses are mostly just an artifact of using an imperfect measurement instrument.

So that’s what I did. I rescaled all ten types of scales (2-point to 11-point) for all three response formats (anchored, unanchored, and mixed – see below for definitions) in every way possible. I think. I might have missed a few, but I don’t think I did. If you want to check out the code, it’s [here][7].

I’m kind of intrigued by the results. I won’t present them all here because in most cases rescaling didn’t lead to any improvement over the alternative: an 11-point rescaled to a 5-point, for example, wasn’t really any better than just using a 5-point in the first place. Because the correlations were nearly the same (.96 and above) for pretty much everything, and because the mean absolute errors usually weren’t hugely different (although they did range from 0.55 to 10.22 on the extremes), and because the issue of systematic error was such a big issue in the previous analysis, I decided to focus on the balance of errors first. I took the total amount by which the aggregate ratings overestimated the quality index for the top 50% of that index, divided it by the total amount of overestimates for the bottom 50%, then did a few transformations (see the code) to get a measure of how much greater a percent of the overestimates were on one half of the quality index compared to the other half. The more this value was different from zero, the more systematic error the scale created.

Re-coding made practically no difference for unanchored and mixed response formats. The unanchored response format is when there is no clear middle point on the scale, so the low end just means “I feel that way a little” and the high end means “I feel that way a lot.” In an anchored scale, the low end is “I feel one way a lot” and the high end means “I feel the opposite way a lot.” The mixed scale represents situations where people randomly answered in either format.

<table width="493" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <span style="text-decoration:underline;">response format</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <span style="text-decoration:underline;">fromscale</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">toscale</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">pattern</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">cor</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">mae</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <span style="text-decoration:underline;">balance</span>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      mixed
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        22
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.75
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.17
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <strong>mixed</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>11</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.72</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.04</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <strong>mixed</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>111</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.60</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.01</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      unanchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        22
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.82
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.61
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <strong>unanchored</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>111</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.66</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.26</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <strong>unanchored</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>11</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.76</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.14</strong>
      </p>
    </td>
  </tr>
</table>

&nbsp;

The “pattern” column shows how I re-coded the responses. Each character represents a place on the new scale, and each number represents how many of the original scale options were re-coded into that place. So the pattern “22” means a four-point scale (the sum of the values) was recoded into a two-point scale (the number of digits), with the first two and last two options on the four point being grouped together. The bolded rows show original scales that weren’t recoded to anything.

I’m only showing results where the “balance” measure indicated that one half of the quality index had no more than twice as many overestimates than the other half. So a balance measure of .17 means that one half of the quality index had 17% more overestimates than the other half of the index when using that particular scale.

Most re-coded scales, like most of the scales in the original analysis, resulted in really imbalanced results. Recoding a 4-point scale to a 2-point resulted in a decent results, but with a mean absolute error and a balance measure that was worse than just using a 2- or 3-point scale to begin with.

Here are the results for the anchored scale:

<table width="499" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      <span style="text-decoration:underline;">response format</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <span style="text-decoration:underline;">fromscale</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">toscale</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">pattern</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">cor</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <span style="text-decoration:underline;">mae</span>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <span style="text-decoration:underline;">balance</span>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      6-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1221
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.59
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.31
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      5-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        131
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.57
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.22
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      <strong>anchored</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>2-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>11</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.75</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.21</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      <strong>anchored</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>3-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>111</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.57</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.21</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      10-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1441
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.60
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.19
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      11-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        191
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.57
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.18
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      7-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        151
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.56
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.18
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      8-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1331
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.59
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.17
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      <strong>anchored</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <strong>4-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <strong>4-pt</strong>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1111</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>1.00</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        <strong>0.61</strong>
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        <strong>0.13</strong>
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      8-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        44
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.76
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.10
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        22
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.76
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.06
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      10-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        55
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.76
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.06
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      6-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      2-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        33
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.76
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.04
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="121">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      9-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        171
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.00
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.56
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.03
      </p>
    </td>
  </tr>
</table>

So this first tells us the same thing we saw from the original analysis – giving a clear neutral point in the middle of the scale resulted in a better match between the survey approximation and the quality index. But the original options, while still not looking shabby at all, are not the best options. The correlation is practically the same for everything, so the MAE and the balance measures are the only way to judge.

*   Re-coding any even-numbered, anchored scale to a 2-point not only improved the MAE and the error balance in comparison to the original measures, but it even improved those measures in comparison to the original (not re-coded) 2-, 3-, and 4-point scales.
*   Re-coding a 10-point or an 8-point scale to a 4-point, or re-coding an 11-point or a 7-point to a 3-point, represented a great improvement over the original scales, represented a very small improvement over the original 2-point and 3-point scales, and showed a better MAE but a worse balance than the original 4-point scale.
*   A 9-point scale re-coded to a 3-point scale beat out all the other options.

I have no idea why a re-coded 9-point would do better than any other scale re-coded to a 3-point, but the type of re-coding for all of the successful scales gives some clues as to why they did better in general. There are a lot of ways you can re-code a 9-point scale into a 3-point. You could combine the first four items, the last four, and leave the middle option alone. You could combine the first three, middle three, and last three. You could combine the first two, last two, and then lump the middle five options together. I tried all those options and they all gave very imbalanced results. The option that did well kept the extreme ratings – the very lowest and the very highest – as they were, and lumped everything else together into a neutral category.

That’s how nearly all of the other well-performing re-codes worked as well. They all kept the outermost scores and combined everything else. The only exception was the re-scaling to 2-points, which lumped the top half and then the bottom half of the original scales.

So in most cases of improved performance, the re-coding actually ended up measuring a discrete behavior – choosing an extreme on a scale. There’s some debate about how many scale options people can really make sense of. I personally have a hard time differentiating beyond three options on either side of the neutral point (what comes between “a little”, “some”, and “a lot”?), but there’s no consensus on the issue (see the references in section 8 of [this][8]). Using multiple choices but counting only the lowest and the highest as non-neutral options effectively measures the extent to which people are willing to commit to a definite choice. All ambiguous choices are counted as non-commitment. I think that’s kind of cool.

So what do we learn from this (for the time being)?

*   Use scales that clearly have a neutral point – something that clearly indicates that ratings on one half the scale are opposites of the ratings on the other half of the scale.
*   If you want to use a scale that has a neutral option that raters can actually chose (in other words, an odd-numbered scale), go with a 9-point scale and lump everything but the most outermost values together. If you use an 11-, 7- or 5-point scale, expect a little more systematic distortion in your results – enough that it might be just as good to just go with a 3-point scale in the first place.
*   If you want to use a scale where raters can’t choose the middle ground, treat ratings on the lower half the scale as the same and treat ratings on the upper half of the scale as the same – so you’ll end up with a 2-point scale.

What do we not learn from this?

*   All of this assumed a pretty big sample size – 2001 respondents. In real-world situations, we often have fewer respondents than that. I don’t know if the different scale and re-coding options perform differently in cases of small sample size (but, by golly, I’m going to find out!)
*   All of this assumed that variation in ratings resulted from uncertainty about how to map real-world quality to survey-world categories. There may be cases where individual members of populations tend to introduce other variation, such as a tendency to rate low-quality items as higher-quality than they actually are, maybe because people don’t like to say bad things about stuff. I’m working on this one, but it involves a whole lot more simulation so it may be a while before I have any results.
*   This doesn’t address questions of reliability at all.

I’m fascinated by this issue not just because surveys are used so often in my line of work, and not just because survey validity has proven to be such a difficult issue for researchers, but because all of these simulation findings point to the possibility that surveys are most valid when they are constructed in ways that explicitly measure behavior rather than opinion. Even if we ask people what they think or feel about something, we may get better results when we ask them to do something about it, even if that something is just choosing one of the extreme values on a set of scale options. That corresponds to a small, but I think important, shift in how we interpret survey results. Surveys are measurement instruments and people interact with them in a way that gives us a record of that interaction. We don’t seem to lose much by recognizing that – and by no longer pretending that we have a record of anything that anyone actually thought or felt.

** **

**UPDATE**: Last night I realized I forgotten that it was possible to re-code an even-numbered scale into an odd-numbered scale. There’s no way to symmetrically split up, say, a 5-point scale into a 6-point scale, but by combining the middle two options, it is possible to symmetrically group a 6-point scale into a 5-point. So if you follow the link to the [code][7], that’s why those options are separate from all the others – I added them later. Here are the results:

<table width="499" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      <span style="text-decoration:underline;">response format</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      <span style="text-decoration:underline;">fromscales</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">toscales</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">pattern</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">cor</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <span style="text-decoration:underline;">mae</span>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <span style="text-decoration:underline;">balance</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      6-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        141
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.000
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.57
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.41
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      8-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        161
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.000
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.57
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.37
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      10-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        181
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.000
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.59
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.28
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      anchored
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      4-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        121
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.000
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.57
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.26
      </p>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="115">
      mixed
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="67">
      6-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      3-pt
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        222
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        1.000
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="64">
      <p align="right">
        0.71
      </p>
    </td>
    
    <td valign="bottom" nowrap="nowrap" width="61">
      <p align="right">
        0.40
      </p>
    </td>
  </tr>
</table>

All of these options are decent but none of them are great. However, the best options again used a scale that was anchored in the middle with a definite neutral point, and were re-coded to only differentiate between the two extremes of the scale and everything else.

 [1]: http://houseofstones.wordpress.com/2012/04/02/surveys-assumptions-and-the-need-for-data-collection-alternatives/
 [2]: http://books.google.com/books/about/How_to_measure_survey_reliability_and_va.html?id=LGWLEJ-Yxk0C
 [3]: http://www.ncbi.nlm.nih.gov/pmc/articles/PMC1055348/pdf/qualhc00019-0012.pdf
 [4]: ftp://ftp.cba.uri.edu/classes/FTPRoot/Classes/ashley/nothing/Christy/use%20of%20expert%20judges.pdf
 [5]: http://journals.lww.com/lww-medicalcare/Abstract/1996/03000/A_12_Item_Short_Form_Health_Survey__Construction.3.aspx
 [6]: http://houseofstones.wordpress.com/2012/02/27/my-problematic-relationship-with-theory/
 [7]: https://docs.google.com/document/d/128yuz3mtU8sEsQxOJnhZCdFXNnhNS_ElIMg7DEYTl7w/edit
 [8]: http://academic.brooklyn.cuny.edu/economic/friedman/rateratingscales.htm