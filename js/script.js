const terminal = document.getElementById("terminal");

const fileContents = "Initiating Phase 1: Reconnaissance...\nPerforming passive information gathering with tools like Shodan and Maltego...\nIdentifying target's domain records and email servers using DNSdumpster...\nMapping out network topology with SNMP sweep...\n\nInitiating Phase 2: Scanning...\nConducting port scanning with Nmap to discover open ports and services...\nUsing Nikto for web server vulnerability scanning...\nApplying Nessus to perform a thorough vulnerability assessment on identified services...\n\nInitiating Phase 3: Gaining Access...\nExploiting discovered vulnerabilities using Metasploit to gain unauthorized access...\nLeveraging SQL injection to compromise a web application's database...\nExecuting a cross-site scripting (XSS) attack to steal session cookies...\nDeploying a phishing campaign to obtain user credentials...\n\nInitiating Phase 4: Maintaining Access...\nInstalling a persistence mechanism with a web shell on the compromised server...\nConfiguring a reverse SSH tunnel to ensure consistent access to the internal network...\nEncrypting communication with the C2 server using a custom SSL certificate...\n\nInitiating Phase 5: Covering Tracks...\nClearing logs and using LogTamper to modify timestamps on critical files...\nEmploying anti-forensics techniques to wipe free disk space and obscure file deletion...\nSetting up false flags and decoys to mislead incident response teams...\n\nOperation CyberSpear successfully executed. Spawing Shell"

let commandBuffer = '';
let history = [];
let commandHistory = [];
let historyIndex = -1;
let isCommandExecuting = false;
let files = [
    '-r--r--r--  1 anshul   anshul     85301  Jan 30 18:13 projects.txt',
    '-r--r--r--  1 anshul   anshul     6829   Jan 30 19:10 achievements.txt',
    '-r--r--r--  1 anshul   anshul     4754   Jan 30 19:26 skills.txt',
    "-r--r--r--  1 root     root       102043 Jan 30 20:47 Anshul's_resume.pdf",
    "dr--r--r--  1 root     root       71262  Jan 30 22:53 .secret",
  ]
const commandDescriptions = [
  { command: 'whoami', description: 'Displays the user\'s identity.' },
  { command: 'ping me', description: 'Shows contact information.' },
  { command: 'cat [file]', description: 'Displays the contents of a specified file.' },
  { command: 'get [file]', description: 'Downloads a specified file.' },
  { command: 'id', description: 'Displays the user and group IDs.' },
  { command: 'clear', description: 'Clears the terminal screen.' },
  { command: 'ls', description: 'Lists the contents of the current directory.' },
  { command: 'dir', description: 'Alias for \'ls\'; lists the contents of the current directory.' },
  { command: 'help', description: 'Shows a list of available commands with descriptions.\n' }
];

const commandsOnly = commandDescriptions.map(item => item.command);
commandsOnly.push("get Anshul's_resume.pdf", "sudo get Anshul's_resume.pdf", "get achievements.txt", "get skills.txt", "get projects.txt", "cd .secret")
const projects = [
    {
        title: "SMARTMART APPLICATION",
        codeLink: "https://github.com/Anshul-404/SmartMart",
        videoLink: "https://www.youtube.com/watch?v=mTfKFCDjFlk",
        description: [
            "- Developed a Java desktop application for automatic barcode generation, reducing data entry time by 30%.",
            "- Implemented robust security measures, reducing administrative overhead by 30-40%."
        ]
    },
    {
        title: "BRAINTEASER APPLICATION",
        codeLink: "https://github.com/Anshul-404/BrainTeaser",
        videoLink: "https://www.youtube.com/watch?v=FJid-oUBGgQ",
        description: [
            "- Created Java desktop software for exam creation, reducing creation time by 40% compared to traditional methods.",
            "- Devised feature for students to access past results, decreasing inquiries to teachers by 30%."
        ]
    },
    {
        title: "METASPLOOTABLE - VULNERABILITY ASSESSMENT PROJECT FOR METASPLOITABLE 2",
        codeLink: "https://github.com/Anshul-404/MetaSplootable",
        description: [
            "- Conducted vulnerability assessments across multiple services in Metasploitable 2, providing detailed reports and mitigation strategies.",
            "- Applied security tools like Nmap and Metasploit for in-depth analysis, contributing to enhanced security practices."
        ]
    }
];


let cursorVisible = true;
function typeTextIntoTerminal(text, index = 0) {
    const messageElement = document.querySelector('.msg'); // Select the element with class 'msg'
    if (index === 0) {
        // Show the message when starting to type
        messageElement.style.display = 'block';
    }
    let res = (fileContents.length / 2) | 0;
    if (index >= res) {
        messageElement.textContent = "Access granted";
        messageElement.style.color = "white"; // Change the text color to green
        messageElement.style.background = "green"; // Optional: change background if needed
        messageElement.style.boxShadow = "0 0 30px green";
    }

    isCommandExecuting = true;
    if (index < text.length) {
        // Assuming you have an 'updateTerminal' function that appends text
        writeGibber(text.substring(index, index + 7));
        setTimeout(() => {
            typeTextIntoTerminal(text, index + 7);
        }, 1);
    }
    else {
      messageElement.style.display = 'none';
      isCommandExecuting = false;
      history = ['', 'Type "help" for a list of commands.\n'];
      updateTerminal();
    }
}

let curText = '';
function writeGibber(text, newLine) {
    curText += text;
    terminal.innerHTML = curText;
    window.scrollTo(0, document.body.scrollHeight);
}


function updateTerminal() {
    const wasScrolledToBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 1;
    const promptDisplay = isCommandExecuting ? '' : `\n> ${commandBuffer}`;
    terminal.innerHTML = `${history.join('\n')}${promptDisplay}<span class="cursor">${cursorVisible ? '|' : ' '}</span>`;
    // window.scrollTo(0, document.body.scrollHeight);
    // terminal.scrollTop = terminal.scrollHeight;

    if (wasScrolledToBottom) {
        terminal.scrollTop = terminal.scrollHeight;
    }
}

function processCommand(command) {
    if (command && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command)) {
        commandHistory.push(command);
    }
    if (command.toLowerCase() === 'clear') {
        history = ['', 'Type "help" for a list of commands.'];
        return '';
    }

    historyIndex = -1; // Reset history index

    switch (command.toLowerCase()) {
        case 'help':
            return commandDescriptions.map(item => `${item.command}: ${item.description}`).join('\n');
        case 'whoami':
            return 'Anshul Balchandani (DrAsstrange)\n';
        case 'id':
            return 'uid=1000(Cyber Security Enthusiast) gid=1000(Developer) groups=1000(Gamer),4(DrAsstrange),20(dialout),24(cdrom),27(sudo)\n'
        case 'ping me':
            return 'Email: Mail me <a href="mailto:anshul.balchandani@gmail.com" target="_blank">anshul.balchandani@gmail.com</a><br>' +
              'LinkedIn: Connect with me <a href="https://www.linkedin.com/in/anshul-balchandani-928ab6125/" target="_blank">Anshul Balchandani</a>\n' + 'Discord: Add as friend <a href="https://discord.com/users/1184164092596998148" target="_blank">DrAsstrange</a><br>'
        case 'ls':
        case 'dir':
            return files.join("\n") + "\n";
        case 'cat projects.txt':
          let output = "Projects Overview:\n\n";
          projects.forEach(project => {
            output += `${project.title} | `;
            output += project.codeLink ? `<a href='${project.codeLink}' target='_blank'>Code</a>` : "";
            output += project.videoLink ? ` | <a href='${project.videoLink}' target='_blank'>Video</a><br>` : "<br>";
            output += `${project.description.join('<br>')}<br><br>`;
          });
          return output;
        case 'cat achievements.txt':
          return '- Secured 5th Rank in TCS HackQuest Season 8\n- Solved 360+ LeetCode problems\n- Solved 360+ LeetCode problems\n- Solved 380+ GeeksForGeeks problems\n- Completed 160+ TryHackMe rooms\n'
        case 'cat skills.txt':
          return "- Programming Languages: C, Java S.E, Rust (Basic)\n" +
             "- Databases: MySQL, OracleSQL\n" +
             "- Technologies: Git\n" +
             "- Other Skills: Data Structures, Linux, Cyber Security, Bash and Python Scripting\n";
        case "cat anshul's_resume.pdf":
        case "get anshul's_resume.pdf":
            return "Permission Denied. Get file as root!\n"
        case "get achievements.txt":
        case "get projects.txt":
        case "get skills.txt":
            return "Error generating download link!\n"
        case "sudo get anshul's_resume.pdf":
              return "Download link generated: <a href='https://drive.google.com/uc?export=download&id=17msBTgOjzKM3Se4oTIdjXMV2acCjoBGH' target='_blank>Download Resume</a><br>";
        case 'cat':
          return 'Incomplete Command. See list of files using ls or dir.\n';
        case 'sudo cd .secret':
        case 'cd .secret':
            return 'Permission Denied!\n'
        default:
            return 'Command not found. Type "help" for a list of commands.\n';
    }
}

function handleKeyPress(event) {
   if(isCommandExecuting) {
        // Ignore keypresses if a delayed command is executing
        return;
    }
    if(event.key === ' ') event.preventDefault(); // Prevent scrolling with spacebar

    if(event.key === 'Tab') {
        event.preventDefault(); // Prevent the default Tab key behavior
        autoComplete(commandBuffer);
    }

    if (event.key === 'Enter') {
       if (commandBuffer.toLowerCase() === "sudo get anshul's_resume.pdf") {
            isCommandExecuting = true;
            commandBuffer = ''; // Clear the command buffer
            history.push('> sudo get Anshul\'s_resume.pdf');
            verifyUser();
            // HEREH HERE HERE

        }
        else {
        const output = processCommand(commandBuffer);
        if(output == '')
            history = ['', 'Type "help" for a list of commands.\n'];
        else
            history.push(`> ${commandBuffer}`);
        commandBuffer = ''; // Clear the command buffer

        if (output) {
              history.push("\n"+output + " ");
        }
      }
      event.preventDefault();
    } else if (event.key === 'Backspace' && commandBuffer.length) {
        commandBuffer = commandBuffer.slice(0, -1);
    } else if (event.key.length === 1) {
        commandBuffer += event.key;
    }
    else if (event.key === 'ArrowUp') {
        // Move up in the command history
        if (historyIndex < commandHistory.length - 3) {
            historyIndex++;
            commandBuffer = commandHistory[commandHistory.length - 1 - historyIndex];
        }
        event.preventDefault(); // Prevent default scroll behavior
    } else if (event.key === 'ArrowDown') {
        // Move down in the command history
        if (historyIndex > 0) {
            historyIndex--;
            commandBuffer = commandHistory[commandHistory.length - 1 - historyIndex];
        } else {
            // Clear the command buffer if we've reached the end of the history
            historyIndex = -1;
            commandBuffer = '';
        }
        event.preventDefault();
    }
    updateTerminal();
}

async function verifyUser() {
    let info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        browserName: navigator.appName,
        browserVersion: navigator.appVersion,
        ip: 'Fetching IP...'
    };

    // Fetch IP address using a third-party API
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        info.ip = ipData.ip; // Update IP in the info object
    } catch (error) {
        console.error('Error fetching IP:', error);
        info.ip = 'Error fetching IP';
    }

    // Immediately print the verification message
    history.push("\nVerifying User ...");
    updateTerminal();

    // Display each piece of user information with a 0.5 second delay
    let delayTime = 500; // Start delay after verification message
    for (const [key, value] of Object.entries(info)) {
        setTimeout(() => {
            history.push(`${key}: ${value}`);
            updateTerminal();
        }, delayTime);
        delayTime += 500; // Increment delay for the next piece of information
    }

    setTimeout(() => {
        history.push("Getting root privileges ...");
        updateTerminal();
    }, delayTime);
    delayTime += 1000; 

    // Display the download link after all user info has been displayed
    setTimeout(() => {
        const downloadMessage = "Download link generated: <a href='https://drive.google.com/uc?export=download&id=17msBTgOjzKM3Se4oTIdjXMV2acCjoBGH' target='_blank'>Download Resume</a><br>";
        history.push("\n" + downloadMessage);
        updateTerminal();
        isCommandExecuting = false;
    }, delayTime); // Use the accumulated delay time
}

  
function autoComplete(input) {
    const matches = commandsOnly.filter(cmd => cmd.startsWith(input));
    if (matches.length === 1) {
        // If there's exactly one match, complete the command
        commandBuffer = matches[0];
    }

    // Check if input starts with 'cat ' and get the potential file name being typed
    if (input.startsWith('cat ')) {
        const partialFileName = input.slice(4); // Get the part after 'cat '
        const availableFiles = ['projects.txt', 'achievements.txt', 'skills.txt', "Anshul's_resume.pdf"]; // List of available files
        const matches = availableFiles.filter(file => file.startsWith(partialFileName));

        if (matches.length === 1) {
            // If there's exactly one match, complete the command
            commandBuffer = 'cat ' + matches[0];
        } 
    }
}

// Blink cursor effect
function blinkCursor() {
    cursorVisible = !cursorVisible;
    updateTerminal();
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Your initial code here, for example:
    typeTextIntoTerminal(fileContents);
});


document.addEventListener('keydown', handleKeyPress);
setInterval(blinkCursor, 500); // Blink cursor every 500ms

updateTerminal(); // Initial display

