# Visibility Control Assessment

This project is a simple client side questionnaire for evaluating visibility control capabilities in a network environment.  Users fill out basic information and answer a series of questions.  When the questionnaire is completed the results can be submitted to a Google Apps Script backend which stores them in Google Sheets.

## Usage

1. Open `index.html` in a modern web browser.
2. Enter your contact information and start the assessment.
3. Answer each question and review the generated report.
4. If a Google Apps Script endpoint is configured, the results will be sent automatically.

The page works entirely in the browser so no build steps are required.  For best results host the files on a web server or deploy them with Google Apps Script.

## Google Apps Script Backend (optional)

To save the results to Google Sheets deploy the `Code.gs` script in this repository as a web app and update the endpoint URL in `questionnaire.js`. The script stores each field and every selected answer in its own column so the results are easier to analyse.

