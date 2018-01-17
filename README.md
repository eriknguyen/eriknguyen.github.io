# ADD TO BAG button animation style
*Demonstrating 3 different states of Zalora add-to-bag button with CSS animation*

## Up and Running
  * Built result is located at `/dist`
  * Development source is located at `/dev`
  * For overview of the result, please open `dist/index.html`
  * For running using source (`npm` or `yarn` required):
    ```
      npm install
      gulp
    ```
    or 
    ```
      yarn
      gulp
    ```

## Button states
  * Default: basic style when user first load page
  * Adding: temporary style when item is adding to user's shopping bag (using 3 empty `<span>` tags to create 3 dots)
  * Success: when item is added (using a `<span>` element and it's size and border to create check mark animation)

## Notes
  * Demo of add-to-bag function is done by JavaScript `setTimeout` function
  * Using Vanilla JavaScript, version: ES5



---
<> with <3 by Erik