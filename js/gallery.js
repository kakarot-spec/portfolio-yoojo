document.addEventListener("DOMContentLoaded", () => {
  // 1. Database of Image Stacks for each of the 8 grid items
  // Insert your file paths here inside the url('...') blocks.
  const galleryData = {
    card1: [
      "url('image/pic1-a.jpg')", // Card 1 — Photo 1 (Front)
      "url('image/pic1-b.jpg')", // Card 1 — Photo 2 (Middle)
      "url('image/pic1-c.jpg')", // Card 1 — Photo 3 (Back)
    ],
    card2: [
      "url('image/pic1-a.jpg')", // Card 2 — Photo 1
      "url('image/pic2-b.jpg')", // Card 2 — Photo 2
      "url('image/pic2-c.jpg')", // Card 2 — Photo 3
    ],
    card3: [
      "url('image/pic3-a.jpg')",
      "url('image/pic1-b.jpg')",
      "url('image/pic3-c.jpg')",
    ],
    card4: [
      "url('image/pic4-a.jpg')",
      "url('image/pic1-b.jpg')",
      "url('image/pic4-c.jpg')",
    ],
    card5: [
      "url('image/pic1-a.jpg')",
      "url('image/pic5-b.jpg')",
      "url('image/pic5-c.jpg')",
    ],
    card6: [
      "url('image/pic1-a.jpg')",
      "url('image/pic6-b.jpg')",
      "url('image/pic6-c.jpg')",
    ],
    card7: [
      "url('image/pic1-a.jpg')",
      "url('image/pic7-b.jpg')",
      "url('image/pic7-c.jpg')",
    ],
    card8: [
      "url('image/pic1-a.jpg')",
      "url('image/pic8-b.jpg')",
      "url('image/pic8-c.jpg')",
    ],
  };

  // 2. State tracking active image indexes (0, 1, or 2)
  const stackStates = {
    card1: 0,
    card2: 0,
    card3: 0,
    card4: 0,
    card5: 0,
    card6: 0,
    card7: 0,
    card8: 0,
  };

  const cards = document.querySelectorAll(".gallery-card");

  cards.forEach((card, index) => {
    const cardKey = `card${index + 1}`;
    const images = galleryData[cardKey];

    const front = card.querySelector(".front-card-frame .img-placeholder");
    const backLeft = card.querySelector(".card-tilt-left");
    const backRight = card.querySelector(".card-tilt-right");
    const frame = card.querySelector(".front-card-frame");
    const deck = card.querySelector(".deck-container");

    // Distribute the 3 pictures across layers smoothly on launch
    front.style.backgroundImage = images[0];
    backRight.style.backgroundImage = images[1];
    backLeft.style.backgroundImage = images[2];

    // 3. CLICK TO CYCLE INTERACTION
    card.addEventListener("click", () => {
      stackStates[cardKey] = (stackStates[cardKey] + 1) % 3;
      const currentActive = stackStates[cardKey];

      // Physical deck card layout shuffle snap animation
      frame.style.transform = "rotate(-6deg) scale(0.92)";
      frame.style.transition = "transform 0.15s ease-in";

      setTimeout(() => {
        front.style.backgroundImage = images[currentActive];
        backRight.style.backgroundImage = images[(currentActive + 1) % 3];
        backLeft.style.backgroundImage = images[(currentActive + 2) % 3];

        frame.style.transform = "rotate(0deg) scale(1)";
      }, 150);
    });

    // 4. PERSPECTIVE MOUSE HOVER TRACKING
    deck.addEventListener("mousemove", (e) => {
      const rect = deck.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      frame.style.transition = "none";
      backLeft.style.transition = "none";
      backRight.style.transition = "none";

      frame.style.transform = `perspective(800px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.03)`;
      backLeft.style.transform = `rotate(-5deg) translate(${x * -12}px, ${y * -12}px)`;
      backRight.style.transform = `rotate(5deg) translate(${x * 12}px, ${y * 12}px)`;
    });

    deck.addEventListener("mouseleave", () => {
      frame.style.transition = "transform 0.4s ease";
      backLeft.style.transition = "transform 0.4s ease";
      backRight.style.transition = "transform 0.4s ease";

      frame.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      backLeft.style.transform = "rotate(-3.5deg) translate(0px, 0px)";
      backRight.style.transform = "rotate(3.5deg) translate(0px, 0px)";
    });
  });
});
