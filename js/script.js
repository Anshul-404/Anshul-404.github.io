const terminal = document.getElementById("terminal");

const fileContents = "\nLaunching Metasploit Framework to probe network vulnerabilities...\nIdentifying open ports with Nmap scan...\nExploiting CVE-2021-34527 via EternalBlue module...\nGaining initial foothold with a reverse shell payload...\nEscalating privileges using DirtyCOW rootkit...\nAccessing root kernel bypass through a known Spectre vulnerability...\nDecrypting network traffic by exploiting WeakDH vulnerabilities...\nInjecting custom shellcode into vulnerable system processes...\nUtilizing Mimikatz to extract plaintext passwords from memory...\nDeploying BeEF framework to hook and control browsers...\nEstablishing persistent access with a Netcat reverse backdoor...\nCovering tracks by tampering with Syslog and auditd logs...\nCreating covert data exfiltration channel using steganography techniques...\nEmploying TOR for anonymous communication with command and control servers...\nLaunching DDoS attack with LOIC against target's infrastructure as a diversion...\nOperation ShadowIntrusion completed successfully. Awaiting further instructions..."

let commandBuffer = '';
let history = [];
let commandHistory = [];
let historyIndex = -1;
let isCommandExecuting = false;
let files = [
    '-r--r--r--  1 anshul   anshul     85301  Jan 30 18:13 projects.txt',
    '-r--r--r--  1 anshul   anshul     6829   Jan 30 18:13 achievements.txt',
    '-r--r--r--  1 anshul   anshul     4754   Jan 30 18:13 skills.txt',
    "-r--r--r--  1 root     root       102043 Jan 30 18:13 Anshul's_resume.pdf",
  ]
const availableCommands = ['whoami', 'contact', 'cat', 'get', 'id', 'clear', 'ls', 'dir', 'help', "get Anshul's_resume.pdf", "sudo get Anshul's_resume.pdf"];

const projects = [
    {
        title: "SMARTMART APPLICATION",
        codeLink: "URL_to_Code",
        videoLink: "URL_to_Video",
        description: [
            "- Developed a Java desktop application for automatic barcode generation, reducing data entry time by 30%.",
            "- Implemented robust security measures, reducing administrative overhead by 30-40%."
        ]
    },
    {
        title: "BRAINTEASER APPLICATION",
        codeLink: "URL_to_Code",
        videoLink: "URL_to_Video",
        description: [
            "- Created Java desktop software for exam creation, reducing creation time by 40% compared to traditional methods.",
            "- Devised feature for students to access past results, decreasing inquiries to teachers by 30%."
        ]
    },
    {
        title: "METASPLOOTABLE - VULNERABILITY ASSESSMENT PROJECT FOR METASPLOITABLE 2",
        codeLink: "URL_to_Analysis",
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
    if (index == res + 1) {
        console.log("GOTCHA");
        messageElement.textContent = "Access granted";
        messageElement.style.color = "white"; // Change the text color to green
        messageElement.style.background = "green"; // Optional: change background if needed
         messageElement.style.boxShadow = "0 0 30px green";
    }

    isCommandExecuting = true;
    if (index < text.length) {
        // Assuming you have an 'updateTerminal' function that appends text
        writeGibber(text.substring(index, index + 3));
        setTimeout(() => {
            typeTextIntoTerminal(text, index + 3);
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
    const promptDisplay = isCommandExecuting ? '\n\nVerifying Current User ...' : `\n> ${commandBuffer}`;
        terminal.innerHTML = `${history.join('\n')}${promptDisplay}<span class="cursor">${cursorVisible ? '|' : ' '}</span>`;
    window.scrollTo(0, document.body.scrollHeight);
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
            return availableCommands.slice(0, availableCommands.length - 2).join("\n") + "\n";
        case 'whoami':
            return 'Anshul Balchandani (DrAsstrange)\n';
        case 'id':
            return 'uid=1000(Cyber Security Enthusiast) gid=1000(Developer) groups=1000(Gamer),4(DrAsstrange),20(dialout),24(cdrom),27(sudo)\n'
        case 'contact':
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
        case "sudo get anshul's_resume.pdf":
              return "Download link generated: <a href='https://drive.google.com/uc?export=download&id=17msBTgOjzKM3Se4oTIdjXMV2acCjoBGH' target='_blank>Download Resume</a><br>";
        case 'cat':
          return 'Incomplete Command. See list of files using ls or dir.\n';
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
            setTimeout(() => {
                // Simulate the delayed operation
                const downloadMessage = "Download link generated: <a href='https://drive.google.com/uc?export=download&id=17msBTgOjzKM3Se4oTIdjXMV2acCjoBGH' target='_blank'>Download Resume</a><br>";
                history.push("\n" + downloadMessage + " ");
                isCommandExecuting = false;
                updateTerminal();
            }, 2000); // Delay of 2000 milliseconds (2 seconds)
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
  
function autoComplete(input) {
    const matches = availableCommands.filter(cmd => cmd.startsWith(input));
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

