---
license: mit
datasets:
- freedisch/911-call-transcripts
language:
- en
pipeline_tag: text2text-generation
tags:
- code
- legal
library_name: peft
base_model: mistralai/Mistral-7B-v0.1
---
# Model Card for 911 Operator Assistant

This model is a fine-tuned version of Mistral-7B-v0.1, designed to assist 911 operators in handling emergency calls professionally and efficiently.

## Model Details

### Model Description

- **Developed by:** The model was developed using the dispatch.ipynb notebook
- **Model type:** Fine-tuned Large Language Model
- **Language(s) (NLP):** English
- **License:** MIT
- **Finetuned from model:** mistralai/Mistral-7B-v0.1

## Uses

### Direct Use

This model is intended to be used as an assistant for 911 operators, helping them respond to emergency calls quickly and professionally.

### Out-of-Scope Use

This model should not be used as a replacement for trained 911 operators or emergency responders. It is meant to assist, not replace, human judgment in emergency situations.

## Bias, Risks, and Limitations

The model may have biases based on the training data used. It should not be relied upon for making critical decisions in emergency situations without human oversight.

### Recommendations

Users should always verify the model's outputs and use them in conjunction with established emergency response protocols.

## How to Get Started with the Model

Use the following code to initialize the model:

```python
from peft import PeftModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

BASE_MODEL = "mistralai/Mistral-7B-v0.1"
LORA_CHECKPOINT = "./lora_adapters/checkpoint-200/"

model, tokenizer = setup_model_and_tokenizer(BASE_MODEL)
model = PeftModel.from_pretrained(model, LORA_CHECKPOINT)
model.to(torch.device("xpu" if torch.xpu.is_available() else "cpu"))
```

Then, you can generate 911 operator responses by providing an input prompt:

```python
prompt = "911 Operator: 9-1-1, what's your emergency?\nCaller: There's a fire in my kitchen!\n911 Operator:"
inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=100)
response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(response)
```

## Training Details

### Training Data

The model was fine-tuned on a dataset of 911 call transcripts, using the "freedisch/911-call-transcripts" dataset.

### Training Procedure 

#### Training Hyperparameters

- **Batch size:** 4
- **Learning rate:** 2e-5
- **Epochs:** 7.62 (based on max_steps)
- **Max steps:** 200
- **Warmup steps:** 20
- **Weight decay:** Not specified
- **Gradient accumulation steps:** 4
- **Training regime:** BFloat16 mixed precision

#### Speeds, Sizes, Times

- **Training time:** Approximately 800.64 seconds (13.34 minutes)

## Evaluation

### Testing Data, Factors & Metrics

#### Testing Data

The model was evaluated on a validation set derived from the same dataset used for training.

## Environmental Impact

- **Hardware Type:** Intel(R) Data Center GPU Max 1100
- **Hours used:** Approximately 0.22 hours (13.34 minutes)

## Technical Specifications

### Model Architecture and Objective

The model uses the Mistral-7B architecture with LoRA (Low-Rank Adaptation) for efficient fine-tuning.

### Compute Infrastructure

#### Hardware

Intel(R) Data Center GPU Max 1100

#### Software

- Python 3.9.18
- PyTorch 2.1.0.post0+cxx11.abi
- Transformers library
- PEFT library
- Intel Extension for PyTorch

## Model Card Authors

https://github.com/freedisch

## Model Card Contact

For more information, please email me (using the contact button on my website: https://thibautbatale.co) and refer to the repositories of the used libraries and base model.

### Framework versions

- PEFT 0.11.1