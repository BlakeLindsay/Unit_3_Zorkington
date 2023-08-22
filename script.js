/* 
    TODO for students
        General Setup:
            - This object is framed for you to fill out the values to help customize your game.
            - This will alter the browser to display your game title. The "Quick Notes" modal will also detail your information along with the description (desc) of what your game is about. It is important to highlight key commands that you want the player to use.
            - The startingRoomDescription will display what the player sees upon coming to your project.

        Do NOT alter the name of this object.

        Both exports are required in order for this project to run.

        - index.html should be running in your browser through the build process.
            - use your browsers console throughout testing.
*/

// base class for all items
class Item {
    // they each have a name and a description
    constructor(name, description, canTake) {
        this.name = name;
        this.description = description;
        this.canTake = canTake;
    }

    // by default they don't do anything
    use() {
        return "Nothing happens.";
    }
}

// extended class for the merger item
class Merger extends Item{
    // the merger will merge the other 3 items
    use() {
        return "Placeholder";
    }
}

// class for the rooms
class Room {
    // each has an array for items in the room
    items = [];

    // each has a name and description
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    // creates array of possible exits for the room
    addExits(...exits) {
        this.exits = exits;
    }
    // for dropping items in a room
    addItem(item) {
        this.items.push(item);
    }
    // for picking up items in a room
    removeItem(name) {
        for (let item in this.items) {
            if(this.items[item] == name) {
                return this.items.splice(item, 1);
            }
        }
    }
}

// dictionary for the rooms
let locations = {
    greenRoom: new Room('The Green Room', 'This room is green.'),
    redRoom: new Room('The Red Room', 'This room is red.'),
    blueRoom: new Room('The Blue Room', 'This room is blue.'),
    mergingRoom: new Room('The Merging Room', 'This room is for merging things.'),
    darkRoom: new Room('The Dark Room', 'This room is dark.')
}

// initializing each room with its items and exits
locations.greenRoom.addExits(locations.redRoom, locations.blueRoom, locations.mergingRoom, locations.darkRoom);
locations.greenRoom.addItem(new Item('Green', 'Essence of green.', true));
locations.greenRoom.addItem(new Item('Dummy', 'Test.', false));
locations.redRoom.addExits(locations.greenRoom, locations.blueRoom, locations.mergingRoom, locations.darkRoom);
locations.redRoom.addItem(new Item('Red', 'Essence of red'), true);
locations.blueRoom.addExits(locations.redRoom, locations.greenRoom, locations.mergingRoom, locations.darkRoom);
locations.blueRoom.addItem(new Item('Blue', 'Essence of blue.', true));
locations.mergingRoom.addExits(locations.redRoom, locations.blueRoom, locations.greenRoom);
locations.mergingRoom.addItem(new Merger('Merger', 'Merges essences.', false));
locations.darkRoom.addExits(locations.redRoom, locations.blueRoom, locations.greenRoom);

export const gameDetails = {   
    title: 'Color Quest',
    desc: 'Welcome to the world of... here are some quick rules & concepts...',
    author: 'Student Name',
    cohort: 'PTSB-JUNE-2023',
    startingRoomDescription: locations.greenRoom.description,
    currentRoom: locations.greenRoom,
    playerCommands: [
        // replace these with your games commands as needed
        'look', 'pickup', 'use', 'drop', 'go'
    ]
    // Commands are basic things that a player can do throughout the game besides possibly moving to another room. This line will populate on the footer of your game for players to reference. 
    // This shouldn't be more than 6-8 different commands.
}

// Your code here

export const domDisplay = (playerInput) => {
    /* 
        TODO: for students
        - This function must return a string. 
        - This will be the information that is displayed within the browsers game interface above the users input field.

        - This function name cannot be altered. 
        - "playerInput" is whatever text the user is typing within the input field in the browser after hitting the ENTER key.
            - test this out with a console log.

        What your player should be able to do (checklist):
            - move between rooms
            - view current room
            - pickup moveable items
                - there should be at least 2 items that cannot be moved.
            - view player inventory
        
        Stretch Goals:
            - drop items in "current room" (if a player picks up an item in one room and moves to another, they should be able to remove it from their inventory)
            - create win/lose conditions.
                - this could be a puzzle that may require an item to be within the players inventory to move forward, etc.

        HINTS:
            - consider the various methods that are available to use.
            - arrays are a great way to hold "lists".
            - You are not limited to just the exported function. Build additional functions and don't forget to hold the return within a variable.
            - Review notes!
                - Have them open as you build.
                - break down each problem into small chunks
                    - What is the process of picking up an item exactly? ex: Look. Pick from a list of items. Put into players list of items... 
    */

    // Your code here

    // trims the input of whitespace at the beginning and end
    playerInput = playerInput.trim();

    //this code block seperates the first word of the input as the command, and the rest of the input as the subject
    let commandEnd = playerInput.indexOf(' ');
    if (commandEnd === -1) {
        // if only one word is given, it is taken as the command
        var command = playerInput;
    } else {
        var command = playerInput.slice(0, commandEnd);
        var subject = playerInput.slice(commandEnd + 1);
    }
    
    console.log(playerInput);
    console.log(commandEnd);
    console.log("command: ", command);
    console.log('subject: ', subject);
    console.log(gameDetails.currentRoom.items);
    
    if (command == gameDetails.playerCommands[0]) { // look
        return 'looked';
    } else if (command == gameDetails.playerCommands[1]) { // pickup
        // the subject is checked if it is in the room
        let index = gameDetails.currentRoom.items.findIndex(item => item.name == subject);
        console.log(index);
        if (index > -1) {
            if (gameDetails.currentRoom.items[index].canTake) {
                // if the subject is an item that can be taken, it is taken
                console.log(gameDetails.currentRoom.items[gameDetails.currentRoom.items.indexOf(subject)]);
                return 'taken';
            } else {
                // if the subject is an item that can not be taken, the user is informed
                console.log(gameDetails.currentRoom.items[index]);
                return `${subject} cannot be taken.`;
            }
        } else {
            // if the subject is not an item in the room, the user is informed
            return `Could not find ${subject}.`;
        }
    } else if (command == gameDetails.playerCommands[2]) { // use
        return 'used';
    } else if (command == gameDetails.playerCommands[3]) { // drop
        return 'dropped';
    } else if (command == gameDetails.playerCommands[4]) { // go
        return 'gone';
    }
    else {
        return `${command} is an unrecognized command.`;
    }
} 
