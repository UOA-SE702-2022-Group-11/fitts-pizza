# Fitts' Pizza

*SOFTENG 702 Group 11 Project*

This project studies the effectiveness of interactive design based activities for teaching Fitts' Law compared to more abstract tasks. Users are able to learn about Fitts' Law, answer some questions about Fitts' Law, and try either the abstract or realistic task. The abstract task involves clicking objects with varying widths and distances to see how this may affect Fitts' Law. The realistic task involves using three variations of a pizza order maker activity to see how they affect Fitts' Law.

## Repository

https://github.com/UOA-SE702-2022-Group-11/fitts-pizza

## System requirements

- Up-to-date web browser (e.g. Chrome)
- Internet connection

## How to run

1. Download the project by either:
   1. Cloning the repository by running the following command in a terminal `git clone https://github.com/UOA-SE702-2022-Group-11/fitts-pizza.git`
   2. Or download and unzip the folder
2. Open the Intro.html page in a web browser
3. Begin!

## Features

- Pre-reading section - to understand what Fitts' Law is and how it relates to interface design.
- Pre-activity questionnaire
- Two interactive activities
  - Design based Pizza order maker activity
  - Link to abstract clicker activity
- Post-activity questionnaire
- Download page to view questionnaire results

## Saving and viewing results

During the activity, you are able to download and save the results of the questionnaires and activity results. These are stored in JSON files.

## Contents of repository

- Application
- Experiment preparation document and evaluation plan
- Participant Information Sheet
- UAHPEC certificates for each group member

## Differences between project plan and implementation

### Questionnaires

The pre and post test questionnaires were significantly changed. The initial project plan involved a single comparison question based on an existing website design. Users would be asked to rank how well they thought the page applied to Fitts' Law, and to explain why. Ultimately this was changed as it was deemed too arbitrary and the qualitative evaluation would be too difficult to easily analyse for the scope of the project.

The modified questionnaires include an increased number of questions based on four different question types. There is also a greater focus on more quantitative data to allow for easier analysis of results.

The first type is a single compare and contrast evaluation question. This involves comparing two designs in relation to Fitts' Law. The designs originate from flight booking websites. Participants must first identify what design elements relate to Fitts' Law for each design. They must then choose which design they feel is better designed in relation to Fitts' Law. The quantitative nature allows for easier comparison. Additionally, as participants must also explain their reasoning, this can allow us to gain a greater insight into their thinking if the quantitative data is lacking.

The second question type is the ranking evaluation. Participants are given five designs to rank from best to worst based on how well they meet Fitts' Law. As another quantitative question, a simple comparison between the two activity groups can be made.

The third question type is the multi-choice quiz questions. These five questions include more theory based concepts of Fitts' Law to investigate how well users are able to apply their knowledge they have gained during the activity.

The final question type is the attitude questionnaire. These utilise a 5-point Likert scale to rate a user's feelings towards different aspects of Fitts' Law. If users are better able to appreciate the concept of Fitts' Law more after the realistic activity compared to the abstract one, this may indicate the realistic activity can be more effective in teaching Fitts' Law concepts. These more subjective questions can be combined with the previous objective questions to gain a greater understanding of the participants' views. If the previous question results prove to be very similar between the two activity groups, their attitude toward Fitts' Law itself can be another method of analysis effectiveness.

The initial project plan included a final feedback questionnaire page to rate various aspects of the educational website itself. Ultimately, this was not included as to reduce the number of questions asked to the participants. Additionally, the tool has already been assessed for usability before evaluating on participants by testing within the group.

### Interactive activity

The realistic task involved the use of an interface designer. Users would be able to design their own interfaces by dragging and dropping interface elements onto a canvas. They would be tasked with designing a specific web element such as a login form and experimenting with how different designs may affect the time taken to complete the login form. It was concluded that this functionality would lower the comparability with the abstract task. As the abstract task is exclusively performance based, the realistic task should be of a similar style. 

The realistic task was instead changed to a set of three variants with different degrees of Fitts' Law adherence. Users would not be able to edit the components. After, they would be able to compare the difference between the three designs based on their time taken to complete the same task in each of the three variants.

The task was also changed from a login form to a more entertaining pizza order completion task. This is better suited to understanding Fitts' Law as it allows for more sequential button presses compared to a more simple login form. Users are given an pizza order to complete where they must click through different categories and select the correct toppings. They are given the same two orders to complete for each of the three interface variants. This allows for easier comparison between the interfaces.

The choice of three variants was to allow the time taken to complete the task to be comparable to the time taken to complete the abstract task. This ensures greater consistency between the two activities. Where the abstract task has a total of 100 clicks, the realistic task will take less clicks to complete. However, the time taken will remain similar as users take longer to consider what is required for each order.

## Realistic design activity results page

The initial project plan included a results breakdown of the design task similar to the abstract task. This would display the distance and width of each interface element, as well as the calculated movement time and index of difficulty values.

In the final implementation, this was changed to include some additional information. As the complexity of the interface has increased, it becomes difficult to clearly break down each element in each of the three design variants. Instead, an overall average index of difficulty value is calculated. This is in addition to the total time taken to complete each task, total misclicks, and clicks per second. This provides a simpler overview to compare each of the three designs.

## Acknowledgements

The abstract task used originates from the computer science field guide website: https://www.csfieldguide.org.nz/en/chapters/human-computer-interaction/fitts-law/
