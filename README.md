# "Interactive Duality"
### ICC_FinalProject
This is my final project for Intro to Creative Computing, where I explore how interaction can change perception..
Doing this project directly in p5js.org was quite inconvinient, so i uploaded it here :)

---

## Concept

This project consists of **8 interactive scenes**, each based on a single illustration.

Every scene presents an image with **dual meanings** that are not immediately visible.  
The interpretation is guided through **metaphorical text** and **simple interaction**, inviting the viewer to actively participate in uncovering hidden layers.

Rather than explaining the images directly, the work encourages **slower looking**, comparison, and discovery.

---

## Structure

- **8 scenes**
- **8 illustrations**

The illustrations themselves remain unchanged —  
only the **viewer’s perspective** shifts.

---

## Considerations

If more time were available, this project could expand into:

- additional scenes using the same visual language  
- more varied interaction types  
- deeper pacing between text and interaction  

The concept is intentionally modular, allowing new scenes to be added without changing the core idea.

---

## Technical Overview

This project is orginized into modular scene classes.

- Each scene is implemented as a separate class  
- A central scene manager controls transitions  
- Interactions include:
  - mouse-based reveal  
  - dragging and snapping elements  
  - keyboard input  
  - timed text sequences  

Text is rendered using a custom **typewriter effect**, synchronised with user interaction rather than fixed timing.
