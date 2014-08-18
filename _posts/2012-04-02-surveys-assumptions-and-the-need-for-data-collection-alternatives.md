---
title: Surveys, Assumptions, and the Need for Data Collection Alternatives
author: Schaun Wheeler
layout: post
permalink: /2012/04/02/surveys-assumptions-and-the-need-for-data-collection-alternatives/
jabber_published:
  - 1333371839
email_notification:
  - 1333371841
tagazine-media:
  - 'a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:8:"20450928";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2012-04-02 13:07:01";}'
categories:
  - Analysis
  - Assumptions
  - Conception
  - Data Collection
  - Design
  - Interpretation
tags:
  - american marketing association
  - correlation
  - focus group interviews
  - mail surveys
  - mean absolute error
  - methodological foundations
  - opinion measures
  - R
  - scale choices
  - scales
  - state of the art marketing research
  - surveys
  - Youtube
---
This is a long post. My [previous][1] [posts][2] have mostly been about my [thoughts][3] on [various][4] [research][5] [subjects][6]. This one reports an actual analysis. If you don’t want to read the whole thing, here are the highlights:

1.  We really need to stop using surveys so much.
2.  If we have to use surveys, it’s probably best to use a three-point scale where it’s clear that the middle point is a neutral option.
3.  If we have to (or really, really want to) use more than a three-point scale, we should probably use an even-numbered scale, preferably no more than a six-point, and make it clear that the top half of the scale choices indicate approval of a particular proposition while the bottom choices indicate disapproval.
4.  We really, really need to stop using surveys so much.
<!--more--></ol> 

**Background**

Marketing research has traditionally been survey research. I have a book on my desk…I don’t know where it came from…called *State of the Art Marketing Research* published in 1992 by the American Marketing Association. Chapter 7 is called “Choosing the Method of Collecting Data” and the sections are as follows: Mail Surveys, Personal Interviews, Telephone Surveys, Completely Self-Administered Surveys, Panels, Omnibus Studies, Focus Group Interviews, Interactive Research, Observation, and The Use of Combination Methods in Data Collection. If we don’t count the last, summary section, eight of the book’s nine methods the book proposes are some form of asking people questions (the “Interactive Research” section was really all about people answering computer-based surveys, which in 1992 was a pretty new thing). In all, the 44-page chapter devoted two-and-a-half pages to observation.

Research methods have evolved since 1992, but Amazon shows that the 1998 update of the book still has the same sections. *Marketing Research: Methodological Foundations* (published in 2009) devotes maybe 10 out of about 140 pages to methods that don’t involve asking people questions in its chapter on data collection. *Marketing Research* (published in 2009 and co-written by David Aaker, a very respected researcher in the field) devotes a substantial number of pages to observation and experimentation but still clearly focuses on the more traditional, question-asking fare. Not long ago, I stumbled across [this][7] post where the author, the CEO of a company that mines web data, described an attitude similar to what I’ve noticed in my short time as a market researcher:

> One member of this company&#8217;s group was meeting us for the first time…“The problem with your data,” he said emphatically, “is that it&#8217;s not the real data. We should use real data&#8230;. data from the surveys we take, not data from the web.”

I haven’t run into many people (so far) who take the position that people’s answers to our questions are the only “real” data out there, but it seems very common for managers and analysts to assume that people’s answers to our questions are informative – that the answers tell us something about those people and their experiences. Even if people don’t assume that observational data is problematic, they do (as a general tendency) assume that survey data is for the most part *not* problematic.

We generally use surveys to try to get information that isn’t readily accessible by other means. We want to know if people *liked* something they bought or experienced or observed, and we usually can’t track their neural activity as they go about liking or not liking the things that interest us. So we ask whether they liked various things, and assume that the number of likes roughly corresponds to the inherent likeable-ness of those things. I don’t think anyone assumes that aggregated survey reports of people’s experiences match the nature of those experiences exactly, but it does seem that a lot of people assume that the mismatch between the experiences and the survey approximations is small enough and random enough to be considered nothing more than an acceptable amount of noise.

**Simulation**

That assumption doesn’t necessarily need to remain an assumption.  In the real world, we can’t know the inherent likeable-ness of an experience, but in a simulation we can create an index of how much some product or experience exhibits a certain quality – likeable-ness, value, or whatever else we can’t measure in the real world – and then simulate survey evaluations of that index, we can get a rough estimate of how well the surveys reflect the quality of interest. It’s not a perfect solution, but it does allow us to better understand how the survey tool itself can mediate or distort the translation from a person’s experience to the report of that experience.

I’ve included some of the R code for this simulation below, but I left a lot of it out for the sake of brevity. You can find the full code [here][8]. The code isn’t very clean. Sorry about that.

Start with the assumption that an experience can range from exhibiting 0% of some quality to exhibiting 100% of it. Now imagine we had a bunch of people rate the experience in terms of how much it exhibited the quality. We could use any number of different scales to do this. At one extreme, we could just ask people to say whether the experience exhibited the quality or not – a 2-point scale. We could add a neutral option – “somewhat,” “maybe,” or “don’t know” – to make it a three-point scale. We could give gradations to the positive or negative answers – “probably yes” and “definitely yes”, “probably no” and “definitely no” – and expand the scale even further.

Assuming there were no problems of [leading][9] or otherwise [poorly-constructed][10] questions, no [self-presentation][11] effects in people’s responses, no [boredom][12] or [miscommunication][13] to bias the results (we can assume those sorts of things in a simulation), the only source of bias should be the ambiguity inherent in each person translating his or her experience into a standardized answer on a survey. An experience may theoretically exhibit anywhere from 0% to 100% of a quality, but practically speaking no human being can reliably differentiate between 87% and 86% quality, or perhaps even between 80% and 60% quality. So to simulate this ambiguity, I nested a series of if-then statements:

<div style="overflow:auto;">
  <div class="geshifilter">
    <pre class="r geshifilter-R" style="font-family:monospace;">good.fun5 &lt;- <a href="http://inside-r.org/r-doc/base/function"><span style="color:#003399;font-weight:bold;">function</span></a> <span style="color:#009900;">(</span> x <span style="color:#009900;">)</span> <span style="color:#009900;">{</span>
	<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">5</span> <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">4</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#339933;">,</span>
				<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">2</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span>
                        <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span>
        <span style="color:#009900;">)</span>
<span style="color:#009900;">}</span></pre>
  </div>
</div>

The quality index ranges from 0 to 100, so I drew a single random number from within that range for each point on the scale, in increments of roughly .05, for a total of 2001 increments. If the random draw was lower than the point on the index, the simulated respondent gave the highest rating possible on the scale. If not, another random draw was made and if that was below the point on the index, the person gave the next highest rating possible, and so on until we ran out of scale options, in which case the lowest rating was given. So for the 90% mark on the quality scale, and using the five-point scale from the above code, a person had a 90% change of marking a 5; if the person did not mark a 5, he or she had a 90% chance of marking a 4; if he or she did not mark a 4, then the person had a 90% chance of marking a 3, and so on.

This assumes that when a person is asked to evaluate something, he or she first considers whether the thing really exhibited the quality in question. In reality, it’s just as possible that a person would start at the other end of the scale, first asking if the thing really lacked the quality in question. In that case, the code should look like this:

<div style="overflow:auto;">
  <div class="geshifilter">
    <pre class="r geshifilter-R" style="font-family:monospace;">bad.fun5 &lt;- <a href="http://inside-r.org/r-doc/base/function"><span style="color:#003399;font-weight:bold;">function</span></a> <span style="color:#009900;">(</span> x <span style="color:#009900;">)</span> <span style="color:#009900;">{</span>
	<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">2</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#339933;">,</span>
				<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">4</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">5</span> <span style="color:#009900;">)</span>
                        <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span>
        <span style="color:#009900;">)</span>
<span style="color:#009900;">}</span></pre>
  </div>
</div>

Because (as far as I know) there’s no research indicating that people consistently use one strategy instead of another, I randomized the choice: I flipped a coin (virtually speaking) and if it came up heads the person considered the high end of the scale first, and if it came up tails the person considered the low end of the scale first.

There’s another issue, though: is the middle point on the scale just the mid-point on the road from low to high ratings, or is it the breaking point between negative and positive ratings? There is [some research][14] to suggest that people answer surveys differently depending on the answer to that question. If the middle-point is just the middle of the scale, the simulation I just described is accurate. However, if that middle point actually acts to anchor the middle of the scale to some statement of neutrality, then we would expect people to first consider whether their experience exhibited or lacked the quality in question, and then consider how much it exhibited or lacked the quality. In other words, they would first decide whether their answer would be on the upper end of the lower end of the scale, and then they would decide where exactly on the upper or lower end they wanted to give their response. In that case, the simulation would look like this:

<div style="overflow:auto;">
  <div class="geshifilter">
    <pre class="r geshifilter-R" style="font-family:monospace;">good.fun5a &lt; -<a href="http://inside-r.org/r-doc/base/function"><span style="color:#003399;font-weight:bold;">function</span></a> <span style="color:#009900;">(</span> x <span style="color:#009900;">)</span> <span style="color:#009900;">{</span>
	<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">5</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">4</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span> <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">2</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span>
        <span style="color:#009900;">)</span>
<span style="color:#009900;">}</span>

bad.fun5a &lt;- <a href="http://inside-r.org/r-doc/base/function"><span style="color:#003399;font-weight:bold;">function</span></a> <span style="color:#009900;">(</span> x <span style="color:#009900;">)</span> <span style="color:#009900;">{</span>
	<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &gt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">2</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span> <span style="color:#339933;">,</span>
		<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">5</span> <span style="color:#339933;">,</span>
			<a href="http://inside-r.org/r-doc/base/ifelse"><span style="color:#003399;font-weight:bold;">ifelse</span></a> <span style="color:#009900;">(</span> <a href="http://inside-r.org/r-doc/base/sample"><span style="color:#003399;font-weight:bold;">sample</span></a> <span style="color:#009900;">(</span> <span style="color:#cc66cc;"></span> : <span style="color:#cc66cc;">100</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">1</span> <span style="color:#009900;">)</span> &lt; x <span style="color:#339933;">,</span> <span style="color:#cc66cc;">4</span> <span style="color:#339933;">,</span> <span style="color:#cc66cc;">3</span> <span style="color:#009900;">)</span>
                <span style="color:#009900;">)</span>
        <span style="color:#009900;">)</span>
<span style="color:#009900;">}</span></pre>
  </div>
</div>

In the case of an even-numbered scale, we could still get this anchoring: the neutral choice just wouldn’t be available so the most neutral option would be to choose the minimally good or minimally bad point on the scale. This issue of forcing this kind of choice has actually [come up][15] [quite a bit][16] over the years in the [survey literature][17].

Finally, it’s possible that some people could answer the survey questions following the midpoint-is-just-a-midpoint strategy while others could follow the midpoint-is-an-anchor strategy. So I flipped another coin: heads they used the unanchored response format, tails they used the anchored format.

**Results**

After all that, it’s just a matter of running the simulation a whole bunch of times. I simulated 2001 responses for each increment of the quality index, for unanchored, anchored, and mixed response formats for survey instruments ranging from 2-point scales to 11-point scales. I then averaged all of the responses, rescaled those averaged responses to run from 0 to 100, and then compared the survey approximation of the quality index to the actual index values. Here are the results:

[<img class="alignnone size-full wp-image-126" title="Rplot_scale-index" src="http://housesofstones.github.io/wp-content/uploads/2012/04/rplot_scale-index.jpg" alt="" width="590" height="894" />][18]

The black line running from bottom-left to top-right is where the values would be if the aggregated survey responses perfectly matched the quality index, while the streams of colored dots show how well each response format actually matched the quality index. It’s clear that the survey scales tend to fare worse the more options those scales have, but generally, the whole thing looks pretty good. But it’s hard to tell for certain since we’re plotting really large ranges of numbers within really small areas.  So let’s look at a few summary measures:

<table width="577" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
    </td>
    
    <td style="text-align:center;" colspan="3" valign="bottom" nowrap="nowrap" width="240">
      <span style="text-decoration:underline;">correlation</span>
    </td>
    
    <td valign="top" width="18">
      <span style="text-decoration:underline;"><br /> </span>
    </td>
    
    <td style="text-align:center;" colspan="3" valign="bottom" nowrap="nowrap" width="258">
      <span style="text-decoration:underline;">mean absolute error</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      <strong>anchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      <strong>unanchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      <strong>mixed</strong>
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
      <strong> </strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      <strong>anchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      <strong>unanchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      <strong>mixed</strong>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      11-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9989
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9740
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9973
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      2.2
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      9.0
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      3.4
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      10-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9990
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9792
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9976
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      2.0
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      8.2
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      3.2
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      9-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9989
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9844
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9983
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      2.2
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      7.2
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      2.6
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      8-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9991
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9889
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9986
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      1.8
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      6.2
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      2.3
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      7-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9989
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9927
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9992
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      2.1
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      5.1
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      1.6
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      6-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9994
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9959
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9992
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      1.4
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      3.9
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      1.4
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      5-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9992
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9982
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9996
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      1.6
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      2.6
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.7
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      4-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9997
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9993
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9996
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      0.6
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      1.4
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.8
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      3-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9997
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9996
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9996
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      0.6
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      0.7
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.6
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="61">
      2-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="72">
      0.9995
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="90">
      0.9994
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.9995
    </td>
    
    <td style="text-align:center;" valign="top" width="18">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="84">
      0.7
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="96">
      0.8
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="78">
      0.7
    </td>
  </tr>
</table>

When assessing the fit between an estimate and a target set of data, I generally like to use a combination of a [correlation][19] and the [mean absolute error][20]. I like these two summary measures because they are easily interpretable – the correlation is the percent of the time that a difference between points in the survey approximation tend to correspond to a similar difference between points in the quality index, and the MAE is the average amount by which the survey approximation missed the mark. So the first measure tell us how often we got it right, and the second measure tells us by how much we got it wrong.

The correlations and MAEs for all of the scales look pretty good. Correlations were a tiny bit lower and the MAEs quite a bit higher higher for the unanchored format than for the anchored format, with the mixed format somewhere in the middle. I did find it interesting that the anchored format fared slightly better for even-numbered scales than for odd-numbered scales, with the exception of the 3-point and 2-point scales: every response format did slightly better with the 3-point than the 2-point. Generally, though, there’s not a huge difference across scales, perhaps with the exception of the MAEs for the unanchored scale – the MAE for the unanchored 5-point was still worse than the MAE for the anchored 11-point. Despite similar summary measures, however, if we plot the errors themselves – the degree to which the survey approximation overestimated or underestimated the quality index – we find some interesting things:

[<img class="alignnone size-full wp-image-127" title="Rplot_error-index" src="http://housesofstones.github.io/wp-content/uploads/2012/04/rplot_error-index.jpg" alt="" width="590" height="590" />][21]

The graph shows a few things that the summary measures already showed: the unanchored response format performed much worse than the anchored and mixed formats. On the 11-point scale, the unanchored response format often missed the mark by anywhere from 5 to over 15 points, while the anchored scale was almost always within five points. We have to drop down to a five-point scale before the unanchored format nears the accuracy of the anchored format on the 11-point scale. Also, you can see that the spread of errors for the 3-point scale is smaller than the spread for the 2-point.

But there are some other things here that the summary measures didn’t tell us:

1.  The errors are systematic. It’s not just that the survey approximations over-shoot and under-shoot their targets. They over-shoot and undershoot only for specific portions of the quality index. Systematic errors are bad. They mean you don’t just have noise obscuring your signal – they mean you have multiple signals.
2.  The anchored and unanchored formats mirror one another. The unanchored format consistently underestimates higher-quality experiences and overestimates lower-quality experiences, while the anchored scale consistently does the opposite. I guess it’s not surprising, but the unanchored format pulls everything towards the middle of the quality index, while the anchored format, which explicitly sets a middle point as the initial point of reference, pushes the middle out towards the scale extremes.
3.  The mixed format is more accurate than the unanchored format, but shares the unanchored format’s biases. So the anchored format pulls left when the unanchored format pulls right, but the unanchored format pulls stronger.

Now it looks like the differences between response formats disappears by the time we reach the 3-point scale (by definition, it disappears in the 2-point scale, because the simulation was practically identical for each response format for that scale), but because the dots overlap so much it’s hard to tell for sure. We can estimate that by taking advantage of the systematic errors in the other scales. If you look at the 11-point scale for, say, the unanchored response format, nearly all of the overestimates are above the 50% mark on the quality index, and nearly all underestimates are below that 50% mark. The same is true for the mixed format, and the opposite is true for the anchored format. So for each scale and response format, if we take just the sum of all the overestimates (we could just as easily use the underestimates) for survey approximates of the upper half of the quality index, and divide that by the sum of the overestimates for the lower half, we get a rough measure of the imbalance of the errors. For convenience of interpretation, I took the absolute value of the natural log of those results – that way, zero indicates balance and the representation of bias is consistent across response formats:

<table width="347" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
    </td>
    
    <td style="text-align:center;" colspan="3" valign="bottom" nowrap="nowrap" width="260">
      <span style="text-decoration:underline;">degree of imbalance</span>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      <strong>anchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      <strong>unanchored</strong>
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      <strong>mixed</strong>
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      11-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.55
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      4.70
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.11
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      10-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.72
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      4.26
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.14
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      9-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.91
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      4.33
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.01
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      8-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.55
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.95
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.00
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      7-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.96
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.71
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.74
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      6-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.39
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.84
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.29
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      5-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.31
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      3.13
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      1.04
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      4-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.13
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      2.18
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      1.14
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      3-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.19
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.23
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.01
    </td>
  </tr>
  
  <tr>
    <td valign="bottom" nowrap="nowrap" width="87">
      2-pt
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.19
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.13
    </td>
    
    <td style="text-align:center;" valign="bottom" nowrap="nowrap" width="87">
      0.04
    </td>
  </tr>
</table>

The 3- and 2-point scales for the mixed response format are actually the least imbalanced, which is an interesting conundrum that I’ll come back to in a second. The 4-, 3-, and 2-point anchored scales and the 3- and 2-point unanchored scales are relatively unbiased. The rest of them are pretty bad.

**So What?**

As I look over the results, the first thought that comes to mind is that this simulation represents how we could expect surveys to distort respondent experience *under conditions of perfect data collection*. In this simulation, the only thing that “went wrong” was the ambiguity inherent in translating a personal experience into a standardized scale. In reality, that is never the only difficulty a researcher faces. I can’t really envision a situation in which those added difficulties would lessen the distortion this simulation predicts. I still want to simulate different non-response rates to see how the relationships between the survey approximations and the quality index change, but that will have to wait for another post.

Speaking of non-response, this exercise gave me an idea: the 3-point scale seems to be the best option for the unanchored and mixed response formats, and only a teeny bit worse than the 4-point for the anchored response format. That means if I did a survey and only gave people a 2-point scale, I could potentially treat those as the end points on a 3-point scale and treat the non-respondents as the middle point. Of course, I would only want to do that for people who answered the survey but didn’t answer specific questions, or if I used the survey in a situation where I could get a measure of who looked at the question but didn’t answer it…I’m thinking of platforms like YouTube, where you could count the number of likes, the number of dislikes, and the number of views that led to neither a like nor a dislike. Treating those views-only as neutral options might actually give a more accurate measure of the quality of the video. Maybe Facebook really does need to create a “dislike” button. I don’t know. I’ll need to think about this one more.

Now, I know that I could make adjustments to the data to mitigate the distortions. I could fit the sine and/or cosine (or a 5<sup>th-</sup> or 6<sup>th</sup>-order polynomial) of the data in a linear model and straighten out those curves. Or I could fit splines in an additive model. Maybe that would be a good idea for some research – perhaps in a re-analysis of previously published data where the original authors used scales with a whole lot of categories – although if the original data were available it would probably make more sense to just recode the responses to reflect a simpler scale &#8211; but I don’t think something like that can work in an applied setting.

Imagine you’re an employee, and your boss is explaining to you that your customer satisfaction ratings will prevent you from getting your bonus this year, or that public opinion in the region in which you operate says that you’re not doing your job well enough, or that your product is being discontinued because it’s just not resonating with consumers. You say, “But I saw my ratings &#8211; they weren’t bad.” Your boss replies, “Oh, I know that, but we ran the whole thing through a computer using math that you’ve forgotten from your high school trigonometry class and the computer says your numbers should have been lower than what they actually were.” That’s just not going to fly, even if the boss puts it more diplomatically.

What strikes me most of all is that the most accurate scales are the ones that come closest to asking respondents to do nothing more than engage in a physical action. In a two-point scale, you either give a thumbs up or a thumbs down. In a three point scale, you give a thumbs up, thumbs down, or you don’t do anything. Once scales start asking people to concrete report some subjective internal state that they feel, that’s where the systematic distortions really creep in.

I can’t help but wonder if that could be an inherent characteristic of any attempt to measure unmeasurable things. No one can measure concretely, say, how likely they would be to recommend a product to a friend because no one really knows what different levels of “likelihood” mean. The topic of interest is inherently ambiguous, so attempts to concretize it by means of a scale are inherently biasing. Instead of trying to get people to tell us how likely they would be to recommend something, we’re better off getting a whole bunch of people to just tell us whether they would recommend it or not – and the aggregated results will tell us how likely the things is to be recommended. But at that point, it’s not much harder to just provide people with a way to actually recommend it, rather than providing them with a way to say they would recommend it, and the number of recommendations will speak for themselves.

We ought to see surveys for what they are: tools for recording behaviors that are related to other behaviors that interest us. They do not record thoughts or emotions. It’s a mistake to pretend that they do. Realizing that, it makes more sense to devote our time and efforts to [recording the actual behaviors][22] that interest us, which is increasingly possible in a variety of markets and settings, and rely on surveys only in those cases where we have no other option.

 [1]: http://housesofstones.github.io/2012/02/27/my-problematic-relationship-with-theory/
 [2]: http://housesofstones.github.io/2012/02/22/why-the-best-ideas-sometimes-dont-seem-very-good/
 [3]: http://housesofstones.github.io/2012/03/15/yes-all-models-are-wrongthat-totally-misses-the-point/
 [4]: http://housesofstones.github.io/2012/02/14/a-numerical-heuristic-is-still-just-a-heuristic/
 [5]: http://housesofstones.github.io/2012/03/12/analytic-modesty-in-the-face-of-poor-performance/
 [6]: http://housesofstones.github.io/2012/03/22/on-the-virtues-of-deliberate-inaction/
 [7]: http://marketinsightcorp.com/commentary/real-data
 [8]: https://docs.google.com/document/d/1lx_74aUMdRLMqzlWSa46G_YKzsKzeDYJvwuGzvPvMaI/edit
 [9]: http://scholar.harvard.edu/sites/scholar.iq.harvard.edu/files/dwegner/files/swann_giuliano__wegner_1982.pdf
 [10]: http://www.isr.umich.edu/src/smp/Electronic%20Copies/68.pdf
 [11]: http://web.mit.edu/berinsky/www/files/CanWeTalk.pdf
 [12]: http://poq.oxfordjournals.org/content/73/2/349.short
 [13]: http://communication.stanford.edu/faculty/krosnick/Violating%20Conversational%20Conventions.pdf
 [14]: http://poq.oxfordjournals.org/content/55/4/570.short
 [15]: http://www.workplaceinstitute.org/blog/forced-choice-responses-vs-a-centre-response-category-which-works-best/
 [16]: http://www.springerlink.com/content/v64l706018t47173/
 [17]: http://www.jstor.org/discover/10.2307/30038845?uid=3739256&uid=2&uid=4&sid=55981928013
 [18]: http://housesofstones.github.io/wp-content/uploads/2012/04/rplot_scale-index.jpg
 [19]: http://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient
 [20]: http://en.wikipedia.org/wiki/Mean_absolute_error
 [21]: http://housesofstones.github.io/wp-content/uploads/2012/04/rplot_error-index.jpg
 [22]: http://housesofstones.github.io/2012/02/04/research-and-the-tools-we-use-to-do-it/