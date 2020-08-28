# Ceros Ski Code Challenge

Welcome to my application for the Ceros Code Challenge - Ski Edition!

As you guys may already know, you can test this project by running:
```
npm install
npm run dev
```

**Challenge fundamentals**

* Good design/architecture;
* Code quality;
* Observe potential improvements;

**Bug fixing**

  As it was stated, there was a bug on the game which I solved by making the correct handling of the crash state of tie skier. The original task asked to solve the problem for the left arrow key but I made it work for both left and right arrow keys.

  I also implemented a few unit tests to help avoid this problem to happen again.

**Extending existing functionality**

  For this task, I made the skier do a simple jump when pressing the SPACE BAR key. Also, if the skier hits a ramp, it will do an awesome front flip with a little chance of a back flip.
  There was some sprites that looked misplaced to me (skier_jump_2, skier_jump_3 and skier_jump_4), so I switched places for the animation to look better.

  I also added a Game Manager singleton to control the shared aspects of the game across other classes.
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following criteria. **Before spending time on any bonus items, make sure 
you have fulfilled this criteria to the best of your ability, especially the quality of your code and the 
design/architecture of your solutions. We cannot stress this enough!**

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!
