---
title: "Bluedot Impact Technical AI Safety Course Reflection: Week Two"
date: "2026-02-24"
description: "A foray into the techniques we use to train safer models."
tags: ["Reflection", "AI", "AI Safety", "Technical", "CoT", "RLHF", "Deliberative Alignment", "Scalable Oversight", "Data Poisoning"]
---

Happy Tuesday! I wanted to reflect and talk about my experience as a participant in Bluedot Impact's Technical AI Safety Course, specifically week two.

This week, we touched on the current techniques used to train safer models. These included input data filtration, human feedback (RLHF), and scalable oversight (and a couple others as well). 

The most obvious of these three was input data filtration. If we want to reduce the occurrence of model's spewing out harmful content, then it makes sense to filter out harmful content before the training process. Fortunately, input data filtration does indeed reduce the incidence of harmful content being perpetuated by the model. This however does come at a cost. Certain "dual-use knowledge" can simultaneously make the model more useful and harmful. For example, let's say you gave the model a chemistry textbook as training data. The model could learn that a certain combination of chemicals could be used for state of the art drug research. On the flip side, the model could learn the formula for creating methamphetamine. Thus there is some information & usefulness loss with input data filtration. Additionally, input data filtration can be completely circumvented by data poisoning. For example, it has been shown that models need only a fixed number (think 250) of poisoned data artifacts to be back-doored. Fun stuff. 

The least obvious of the techniques we learned was Reinforcement Learning from Human Feedback (RLHF). Basically, we use human experts to generate "good" outputs. We then fine-tune our Base LLM using those "good" outputs. We then feed our Fine-Tuned LLM a prompt and ask it to provide two separate outputs. We then have a human expert comparatively review these outputs and rank them. Using this collection of pair-wise rankings, we can then fine-tune our Base LLM again, resulting in the Reward Model. The Reward Model then is tasked with reviewing the answers generated from our Policy Model (from a specific prompt) and then providing the Policy Model with a "reward" that fine-tunes the Policy Model to output more "good outputs". This is called Proximal Policy Optimization. I got REALLY confused the first time around with this material. I recommend toying with it in your head and watching videos. Diagrams help here as well. 

Now, RLHF has a couple of limitations. Mainly, obtaining high-quality feedback is hard and expensive (will get harder once we make systems smarter than us), AI models could develop Situational Awareness (they will know they are being evaluated), AI models may tell us what we want to hear (sycophancy), and AI models could deceive us during this entire process. Even in the midst of the limitations, RLHF is still INCREDIBLY useful for building safer models. 

Along the same lines, scalable oversight deals with two questions:
1. How might we provide good, cheap feedback to the model? 
2. How might we evaluate superhuman models? 

If we do not address these two questions then models will develop dangerous behaviors like sycophancy, deception, and hallucinations. 

One technique we can use to address scalable oversight is deliberative alignment. 
Deliberative alignment (similar to Constitutional AI) is an AI safety technique that enables models to reason about a hierarchical safety specification before responding to user queries. This decreases the incidence of scheming in the model. However it has a big problem. Namely, just because we are getting "safer" responses from the model doesn't mean we are getting them for the right reason. Meaning, the model could ACTUALLY be getting "safer" OR it could simply be getting better at hiding its scheming. This concern compounds when considering that model CoT may not always be faithful. 

Overall, it is obvious that AI Safety is an extremely difficult problem-space (perhaps the most difficult humans have ever attempted to conquer). To me, it is akin to mountaineering the tallest peak in the known universe without a rope. Maybe conquering AI Safety will be Alex Honnold's next feat?

---

![Technical AI Safety Week Two](/technical-ai-safety-week-two.png)

*Courtesy of ChatGPT 5.2 Thinking*