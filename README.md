# Typing Test Engine

A highly responsive typing test application built using Vanilla JavaScript. 

This project focuses on DOM manipulation, cross-platform event handling, and  state management to provide a zero-latency typing experience.

## Engineering Highlights

* **O(1) Keystroke Validation:** Implemented a two-pointer state matching system to validate user input against the fetched text array, avoiding string re-evaluations.
* **Asynchronous Data Fetching:** Utilizes `Axios` to fetch and parse a randomized 10,000-word dataset via a GitHub REST endpoint.
* **Global Hardware Overrides:** Used custom event listeners to detect a specific keybind (Alt/Option + R), preventing native browser defaults to create a global, instant-reset loop.
* **Zero-Shift CSS Architecture:** Built a custom blinking text cursor using CSS `box-shadow` to prevent layout shifting.
* **Flexbox UI:** Built a responsive, strictly bounded UI that scales fluidly.

##  Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox), Vanilla JavaScript
* **Data Fetching:** Axios / REST APIs

## Current Features
* Fixed 30, 60, and 90 word test lengths.
* Dynamic progress bar.
* Global hardware reset keybind (`Alt/Option + R`).
* Dark Theme.

## Upcoming Features

- **Live WPM Tracker:** A background `setInterval` engine to calculate and display WPM continuously during active gameplay.
- **Time-Attack Mode:** Fixed 15s/30s/60s modes in addition to the fixed word-count modes.
- **Custom Cursors:** Allowing users to toggle between box-shadow, underscore, and block cursors.
