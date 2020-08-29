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
   
**Building something new**

  The mighty rhino is here!
  The game now has a angry rhino chasing the player down the mountain. It can run to the left, to the right and downwards. If it catches the player, you are done.
  
* The rhino appears after a specific amount of time and at a specific distance from the player;
* The rhino runs faster then the player when both are going downwards but the player goes faster if slides on diagonal, adding some challenge to the game.

**Documentation:**

  This readme file is being updated along with the implementation itself.

**Bonus**

Checklist of bonus items:

- [ ] Provide a way to reset the game once it's over
- [ ] Provide a way to pause and resume the game
- [ ] Add a score that increments as the skier skis further
- [ ] Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
- [ ] Deploy the game to a server so that we can play it without having to install it locally
- [ ] Write more unit tests for your code
