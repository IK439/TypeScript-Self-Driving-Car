# TypeScript-Self-Driving-Car

## Description
This program simulates an autonomous car responding to events detected by a computer vision system. The car can react to obstacles, accelerate, decelerate, perform emergency braking, and execute parallel parking maneuvers. The simulation demonstrates event-driven behavior and the interaction between steering and speed control systems.

## Coding Techniques
- TypeScript interfaces for structured data (`AutonomousCar`, `Steering`, `Speed`, `Events`)
- Classes implementing multiple interfaces for modular control systems
- Event-driven programming: car responds dynamically to detected events
- Conditional logic and switch statements for event handling
- Looping through multiple simulation turns to test behavior
- Randomized obstacle detection using a helper function
- Modular imports/exports for clean code separation

## Example Output
```
Executing: turn right
Executing: accelerate
Executing: turn right
Executing: turn left
Executing: decelerate
Executing: turn right
Initiating parallel parking maneuver
Executing: decelerate
Executing: turn right
Executing: turn left
Executing: EMERGENCY STOP
Executing: turn right
Executing: EMERGENCY STOP
```
