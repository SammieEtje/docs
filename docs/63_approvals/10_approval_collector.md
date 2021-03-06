---
id: 10_approval_collector
title: Approval framework
sidebar_label: Approval framework
---
:::caution
This is page is work in progress
:::

## Introduction
If the security policies of your organisation require this, the approval framework in Argos Notary can be used for an
additional approval step on source code or deployment.
It allows functionaries (product owners technical leads etc..) to approve a set of source code or deployment artifacts within Argos Notary.
This process will collect artifacts from the collector microservice (descibed below) and will produce a link file comparable with a link file produced in a supply chain step.
The functionary is asked to sign this link file with her or his personal key. In this way immutability and auditability is ensured for the artifacts.
The approval step can be configured in Argos Notary using the layout editor.
This can be configured to include any number of functionaries so one can implement a 4 eyes principle if needed.

## Architectural setup
The architectural setup works with separate collector microservices to collect artifacts from their respective sources.
These microservices act as proxies between the Argos front-end and the source servers.
The design decision to use separate collectors is made because of the possibility that the artifact sources are located in separate domains within organisations.
They may therefore not be not be accessible by the argos service.
The Argos front-end runs in a web browser and has access to both the collector services running in the same domain as the artifact sources and the Argos Service.
The decision to use collector microservice as a proxy is made because it provides a unified interface for the Argos front-end to collect artifacts.

The diagram below illustrates the principles described.
The lollipop symbols are the provide interfaces of the components.
The semi-circle symbols represent the required interfaces.
![COLLECTOR-FRAMEWORK](/img/approvals/collector-framework.svg)

The sequence diagram below illustrates the interaction between the components in the approval process.

![APPROVAL-FLOW](/img/approvals/approval_flow.svg)





