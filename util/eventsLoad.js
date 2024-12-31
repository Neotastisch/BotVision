const fs = require('fs')
const path = require('path')

module.exports = (client, basePath) => {
    const eventsPath = path.join(basePath, 'events');
    
    // Read all items in the events directory
    const items = fs.readdirSync(eventsPath);
    
    for (const item of items) {
        const fullPath = path.join(eventsPath, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            // Handle subdirectories
            const files = fs.readdirSync(fullPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                loadEvent(client, path.join(fullPath, file));
            }
        } else if (item.endsWith('.js')) {
            // Handle direct .js files
            loadEvent(client, fullPath);
        }
    }
}

function loadEvent(client, eventPath) {
    try {
        const event = require(eventPath);
        if (!event.name) {
            console.error(`Name Not Given In ${eventPath}`);
            return;
        }
        
        client.on(event.name, (...args) => {
            event.run(client, ...args);
        });
        
        console.log(`Loaded event: ${event.name}`);
    } catch (error) {
        console.error(`Error loading event ${eventPath}:`, error);
    }
}