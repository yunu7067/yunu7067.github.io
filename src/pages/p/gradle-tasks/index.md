---
layout: '@lays/BlogPost.astro'
title: 'Gradle Task 톺아보기'
publishDate: 2022-06-01
description: 'Gradle Tasks가 어떻게 구성되어있는지 궁금해서 쓰는 글.'
tags: ['Backend', 'gradle']
---

# Tasks

## application

### bootRun

```
오후 3:36:16: Executing 'bootRun'...

> Task :compileJava
> Task :processResources
> Task :classes
> Task :bootRunMainClassName

> Task :bootRun
(중략)

BUILD SUCCESSFUL in 6s
4 actionable tasks: 4 executed
오후 3:36:23: Execution finished 'bootRun'.
```

## build

### bootJar

```
오후 3:35:19: Executing 'bootJar'...

> Task :compileJava
> Task :processResources
> Task :classes
> Task :bootJarMainClassName
> Task :bootJar

BUILD SUCCESSFUL in 4s
4 actionable tasks: 4 executed
오후 3:35:24: Execution finished 'bootJar'.
```

### build

```
오후 3:34:49: Executing 'build'...

> Task :compileJava
> Task :processResources
> Task :classes
> Task :bootJarMainClassName
> Task :bootJar
> Task :jar
> Task :assemble
> Task :compileTestJava
> Task :processTestResources NO-SOURCE
> Task :testClasses
> Task :test
> Task :check
> Task :build

BUILD SUCCESSFUL in 7s
7 actionable tasks: 7 executed
오후 3:34:57: Execution finished 'build'.
```

### clean

```
오후 3:35:57: Executing 'clean'...

> Task :clean

BUILD SUCCESSFUL in 289ms
1 actionable task: 1 executed
오후 3:35:58: Execution finished 'clean'.
```

### jar

```
오후 3:44:50: Executing 'jar'...

> Task :compileJava
> Task :processResources
> Task :classes
> Task :jar

BUILD SUCCESSFUL in 3s
3 actionable tasks: 3 executed
오후 3:44:54: Execution finished 'jar'.
```

## verification

### check

```
> Task :compileJava UP-TO-DATE
> Task :processResources UP-TO-DATE
> Task :classes UP-TO-DATE
> Task :compileTestJava UP-TO-DATE
> Task :processTestResources NO-SOURCE
> Task :testClasses UP-TO-DATE
> Task :test
> Task :check
BUILD SUCCESSFUL in 1s
4 actionable tasks: 1 executed, 3 up-to-date
오후 3:40:47: Execution finished 'check'.
```

### test

```
> Task :compileJava UP-TO-DATE
> Task :processResources UP-TO-DATE
> Task :classes UP-TO-DATE
> Task :compileTestJava UP-TO-DATE
> Task :processTestResources NO-SOURCE
> Task :testClasses UP-TO-DATE
> Task :test
BUILD SUCCESSFUL in 2s
4 actionable tasks: 1 executed, 3 up-to-date
오후 3:40:12: Execution finished 'test'.
```
