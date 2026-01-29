import { getObstacleEvents } from "./computer-vision";

// Interface for an autonomous car
interface AutonomousCar {
  isRunning?: boolean; // Whether the car is currently running
  respond: (events: Events) => void; // Function to respond to detected events
}

// Props to initialize an autonomous car
interface AutonomousCarProps {
  isRunning?: boolean; // Optional initial state
  steeringControl: Steering; // Steering system
  speedControl: Speed; // Speed control system
}

// Generic event object mapping event names to boolean triggers
interface Events {
  [eventName: string]: boolean;
}

// Base interface for a control system
interface Control {
  execute: (command: string) => void; // Execute a generic command
}

// Steering system interface, extends base control
interface Steering extends Control {
  turn: (direction: string) => void; // Turn left or right
}

// Speed system interface, extends base control
interface Speed extends Control {
  accelerate: () => void;
  decelerate: () => void;
  stop: () => void;
}

// Main Car class implementing AutonomousCar
class Car implements AutonomousCar {
  isRunning: boolean;
  steeringControl: Steering;
  speedControl: Speed;

  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning ?? false; // Default off if not specified
    this.steeringControl = props.steeringControl;
    this.speedControl = props.speedControl;
  }

  // Respond to events detected by sensors/vision system
  respond(events: Events) {
    if (!this.isRunning) {
      console.log("The car is OFF");
      return; // Do nothing if car is off
    }

    Object.keys(events).forEach((eventKey) => {
      if (!events[eventKey]) return; // Skip events that are false

      switch (eventKey) {
        case "ObstacleLeft":
          this.steeringControl.turn("right"); // Turn away from left obstacle
          break;

        case "ObstacleRight":
          this.steeringControl.turn("left"); // Turn away from right obstacle
          break;

        case "Accelerate":
          this.speedControl.accelerate();
          break;

        case "Decelerate":
          this.speedControl.decelerate();
          break;

        case "EmergencyBrake":
          this.speedControl.stop(); // Immediate stop
          break;

        case "ParallelPark":
          console.log("Initiating parallel parking maneuver");
          // Simple parallel parking sequence
          this.speedControl.decelerate();
          this.steeringControl.turn("right");
          this.steeringControl.turn("left");
          this.speedControl.stop();
          break;
      }
    });
  }
}

// Steering control implementation
class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`); // Print the command executed
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`); // Execute a turn command
  }
}

// Speed control implementation
class SpeedControl implements Speed {
  execute(command: string) {
    console.log(`Executing: ${command}`); // Print the command executed
  }

  accelerate() {
    this.execute("accelerate");
  }

  decelerate() {
    this.execute("decelerate");
  }

  stop() {
    this.execute("EMERGENCY STOP");
  }
}

// Instantiate the controls
const steering = new SteeringControl();
const speed = new SpeedControl();

// Instantiate the autonomous car with the controls
const autonomousCar = new Car({
  isRunning: true,
  steeringControl: steering,
  speedControl: speed,
});

// Number of simulation turns
const turns = 5;

// Simulate events over multiple turns
for (let i = 0; i < turns; i++) {
  const visionEvents = getObstacleEvents(); // Get events from computer vision

  // Add test events for demonstration purposes
  const testEvents: Events = {
    ...visionEvents,
    Accelerate: i === 0, // Accelerate on first turn
    Decelerate: i === 2, // Decelerate on third turn
    ParallelPark: i === 3, // Attempt parallel park on fourth turn
    EmergencyBrake: i === 4, // Emergency stop on last turn
  };

  autonomousCar.respond(testEvents); // Car reacts to events
}