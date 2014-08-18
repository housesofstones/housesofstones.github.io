---
title: 'The Value of Reproducible Research: Sometimes the response matters more than the results'
author: Paul Meinshausen
layout: post
permalink: /2012/12/06/the-value-of-reproducible-research-sometimes-the-response-matters-more-than-the-results/
jabber_published:
  - 1354825955
email_notification:
  - 1354825959
tagazine-media:
  - 'a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:8:"20544712";s:7:"blog_id";s:8:"32115977";s:9:"mod_stamp";s:19:"2012-12-06 20:35:43";}'
categories:
  - Analysis
  - Design
  - General
  - Personal
tags:
  - Afghanistan
  - policy
  - surveys
---
Yesterday I followed a tweet to [a post][1] by [Jason Lyall][2] responding to apparently widespread criticism of [a new survey in Afghanistan done by the Asia Foundation][3]. The post was the first I&#8217;d heard of the survey or of the response to it, so I don’t know anything more about the criticism than what Jason wrote, or much about the nature or arguments of the criticism. But the post did link to [one criticism in particular][4], from [Sarah Chayes][5], a journalist turned NGO-founder and regular ISAF-hired expert on Afghanistan. The general approach taken in her critique seems illustrative of something I find very valuable about systematic and reproducible research and analysis: it facilitates productive and progressive (though perhaps not always intentionally so) responses.<!--more-->

This is probably best demonstrated by first considering the alternative. What kind of responses do non-reproducible research facilitate? I got into this a little bit in [a post][6] I wrote about a wide swath of anthropology a few months ago. But in general, non-reproducible research methods are typically communicated in some combination of the following phrases:

>  &#8221;I spent x years&#8230;talked to many local people&#8230;formed friendships&#8230;everyone on the inside knows&#8230;deep study of contextual issues&#8230;time spent on the ground&#8230;thorough analysis of the ethnographical work that&#8217;s been done&#8230;extensive experience with locals.&#8221; Etc.

When taking on the study of practically any subject, there are countless ways to formulate the research problem. But let’s say in attempting to tackle a social topic that you limit yourself to a modest ten features or factors of society that you consider important, and then for convenience sake let&#8217;s pretend each of those factors is only a [binary][7] – either it&#8217;s present or it isn&#8217;t (e.g. Muslim/non-Muslim, Poor/non-Poor, Literate/non-Literate). Just those ten factors can be combined in 1,024 ways. Now let’s say you&#8217;ve spent an impressive amount of time and effort and as one result you&#8217;ve produced a 30-page paper.

At a general level, two responses come immediately to mind: 1) One could throw up one’s hands in the air and say &#8220;there&#8217;s just absolutely no way you can ever really analyze human culture/behavior/society. So, whatever.&#8221; (A response I consider more often than is probably healthy) or 2) One can say something like, &#8220;ok, but I think it&#8217;d be better or more useful, or we still need, to explore these other two or three combinations.&#8221; And off they go to implement their design. Now how does the resulting research connect? It doesn&#8217;t really. One person’s take is her take. Another person’s take is his. The basic feature of this process is that it&#8217;s entirely horizontal scaling. You can&#8217;t really build *on* someone else&#8217;s work because there’s no clear way one set of features is related to another. You can just build *out*. And there&#8217;s really no end in sight, because the original assumption of ten factors isn&#8217;t a reasonable one. In this world of endlessly additional factors and rapidly multiplying new combinations, &#8220;progress&#8221; in research and analysis means very little.

Now turn to reproducible research. What the Asia Foundation did was say &#8220;this question is important&#8221; and we&#8217;re going to ask &#8220;these people&#8221;. So we know exactly what questions they asked (assuming some basic research integrity) and we know fairly precisely whom they asked. And just having those clear details of the research design facilitates a very different kind of response. The very worst-case scenario is where we believe outright fraud occurred. In that case the very clear response is to go and actually ask those questions and to those same people (or as close as we can get), and compare the responses (here are fraudulent responses, here are real responses). Few people really do assume outright fraud, and in that case there are some other clear responses:

*“That was the wrong question.”*

Ok, let&#8217;s go ask the right question and compare responses again.

*“Those were the wrong people.”*

Ok, let&#8217;s go ask the right people, and again compare responses.

*“We shouldn&#8217;t be asking questions, we should be comparing weapons procurement and sales.”*

Ok, let&#8217;s go try to survey the prices of weapons in different areas, or find out who has weapons. Afghans will lie because they think you&#8217;ll try to take their weapons away? Ok, let&#8217;s have other Afghans ask. Or let&#8217;s figure out some alternative indirect measures, and again compare responses. All of a sudden it&#8217;s clear and obvious how each subsequent study builds and relates to the former. Each new research project isn’t its own brand new thing; instead it’s built on the work of the past. All of a sudden we&#8217;re engaged in a great collective effort and not lost in our own eternally isolated worlds. We have a foothold and we can begin to climb towards improvement.

Reproducible research is so powerful that even those who fundamentally believe that systematic research has nothing to offer find themselves making their criticisms in reproducible, checkable ways. Even Chayes, who doubts any methods are as good as experience, spends a substantial portion of her critique making criticisms of the methods (which she can only do because they were clear and reproducible). How does one criticize an article based on experience? “You should have had a different experience!”?

This brings me to my main point. The value of reproducible research is sometimes not really in its initial results, but rather in the responses it provokes. It may be that the Asia Foundation&#8217;s study is so problematic that we can&#8217;t really use it to say much about Afghanistan (I haven’t looked at it thoroughly enough to say anything about that). Fine, but just by doing the study they&#8217;ve provoked a criticism that motivates progress. “They did a poor job, and we can do it better.” Whatever happens next, it can be built on what happened before. And through an iterative process a collective effort will emerge with collective results that are simply not possible without that continuity and collective effort. The alternative worlds are either one where we all lay our own individual bricks on our own individual plots of land or one where we lay our bricks on top of each other, and we build something really usable. This after all, is a popular and important critique that’s frequently made of the ISAF effort: that there is no continuity between deployments. That units do their thing and then leave and the next unit comes along with no knowledge of what was done before, and so proceeds to do something entirely new and entirely different and entirely doomed to end six-to-nine months later with the end of that unit&#8217;s deployment. It’s recognizable madness.

Somewhat weirdly, in the community I currently inhabit it doesn&#8217;t make sense to write this post. Tell someone here at Harvard (at least in the parts of the departments I tend to experience) that you&#8217;re writing about the importance of reproducible research and evidence, and they&#8217;ll look at you like you&#8217;re writing a paper for an intro to research methods course. &#8220;Why would you waste time writing something this basic and obvious?&#8221; This past summer, an article was written making a similar argument to the one Chayes makes but at a general level (not about Afghanistan) in [a Scientific American blog post][8]. I didn&#8217;t really see much of a response to it, except for this [small strident tweet][9] from [Dan Gilbert][10], a prominent professor in the psychology department:

<blockquote class="twitter-tweet tw-align-center">
  <p>
    Stupidest essay of the year (so far). The claim that &#8220;we shouldn&#8217;t study this scientifically&#8221; is always wrong. <a title="http://bit.ly/P3E2Fe" href="http://t.co/gBTCoS0S">bit.ly/P3E2Fe</a>”
  </p>
  
  <p>
    — Daniel Gilbert (@DanTGilbert) <a href="https://twitter.com/DanTGilbert/status/233971440590934018">August 10, 2012</a>
  </p>
</blockquote>

Arguments that are “the stupidest of the year” don&#8217;t warrant much attention, and they don&#8217;t typically get it around here. But I think that&#8217;s actually sad and unfortunate. Because in the other (government analysis) world, the idea that analysis of the conflict in Afghanistan should be done systematically and using methods that are reproducible is hardly a trivial point. In that other world, the world where recognizably important decisions are being made, reproducibility is a strange and somewhat incoherent concept. Chayes writes that &#8220;recent conversations&#8230;(are) factors (which) provide more eloquent indications about prevailing conditions than do opinion surveys&#8221;, and she really believes that. It&#8217;s very likely that she doesn&#8217;t know anyone (and she knows a lot of the population of “experts” considered to &#8220;know something&#8221; about Afghanistan) who works in Afghanistan and believes systematic analysis has anything to do with understanding the conflict in Afghanistan.

The gap between the reproducible social science community and the foreign policy/national security community is so large that neither side recognizes how or why it might need to communicate with the other. Hence in the US we have a relatively vibrant scientific community that has almost no contact with or impact on a relatively powerful policy community. And of such gaps and disconnects are massive disasters like the war in Afghanistan (and many other congressional policies, for that matter) made.

 [1]: http://themonkeycage.org/blog/2012/12/05/surveys-in-conflict-settings/
 [2]: http://pantheon.yale.edu/~jml27/YaleWebsite/Intro.html
 [3]: http://asiafoundation.org/country/afghanistan/2012-poll.php
 [4]: http://carnegieendowment.org/2012/12/03/in-afghanistan-it-s-not-all-in-numbers/epjw
 [5]: http://carnegieendowment.org/experts/?fa=expert_view&expert_id=712
 [6]: http://housesofstones.github.io/2012/09/06/why-should-we-believe-you-anthropology-and-public-interest/
 [7]: http://en.wikipedia.org/wiki/Binary
 [8]: http://blogs.scientificamerican.com/literally-psyched/2012/08/10/humanities-arent-a-science-stop-treating-them-like-one/
 [9]: https://twitter.com/DanTGilbert/status/233971440590934018
 [10]: http://www.wjh.harvard.edu/~dtg/gilbert.htm