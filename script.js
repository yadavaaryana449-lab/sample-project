// Attendance Calculator
const attendedClassesInput = document.getElementById("attendedClasses");
const totalClassesInput = document.getElementById("totalClasses");
const calculateBtn = document.getElementById("calculateBtn");
const calculationResult = document.getElementById("calculationResult");
const resultPercentage = document.getElementById("resultPercentage");
const resultMessage = document.getElementById("resultMessage");
const progressFill = document.getElementById("progressFill");
const attendanceStat = document.getElementById("attendanceStat");
const attendanceStatus = document.getElementById("attendanceStatus");

calculateBtn.addEventListener("click", function () {
    const attended = Number(attendedClassesInput.value);
    const total = Number(totalClassesInput.value);

    if (attendedClassesInput.value === "" || totalClassesInput.value === "") {
        resultMessage.textContent = "Please enter both values first.";
        calculationResult.style.display = "block";
        resultPercentage.textContent = "Error";
        progressFill.style.width = "0%";
        return;
    }

    if (total <= 0 || attended < 0) {
        resultMessage.textContent = "Total classes must be greater than 0 and attended classes can't be negative.";
        calculationResult.style.display = "block";
        resultPercentage.textContent = "Invalid";
        progressFill.style.width = "0%";
        return;
    }

    if (attended > total) {
        resultMessage.textContent = "Attended classes can't be more than total classes.";
        calculationResult.style.display = "block";
        resultPercentage.textContent = "Invalid";
        progressFill.style.width = "0%";
        return;
    }

    const percentage = (attended / total) * 100;
    const roundedPercentage = percentage.toFixed(1);

    resultPercentage.textContent = roundedPercentage + "%";
    progressFill.style.width = roundedPercentage + "%";
    calculationResult.style.display = "block";

    if (percentage >= 75) {
        resultMessage.textContent = "Attendance is above 75% ✅";
        resultMessage.style.color = "#28c76f";
    } else {
        resultMessage.textContent = "Attendance is below 75% ⚠️";
        resultMessage.style.color = "#ffb703";
    }

    attendanceStat.textContent = roundedPercentage + "%";
    attendanceStatus.textContent = percentage >= 75 ? "Above 75% ✓" : "Below 75% ⚠️";

    if (percentage >= 75) {
        attendanceStatus.style.color = "#28c76f";
    } else {
        attendanceStatus.style.color = "#ffb703";
    }
});

// Task Manager
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [
    { id: 1, text: "Complete Mathematics assignment", completed: false },
    { id: 2, text: "Study for Physics quiz", completed: false }
];

function updateTaskStats() {
    const taskCount = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;

    totalTasks.textContent = taskCount;
    completedTasks.textContent = completedCount;
}

function renderTasks() {
    tasksList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("click", function () {
            task.completed = !task.completed;
            renderTasks();
            updateTaskStats();
        });

        const taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "task-delete";
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
            updateTaskStats();
        });

        const checkboxWrapper = document.createElement("div");
        checkboxWrapper.className = "task-checkbox";
        checkboxWrapper.appendChild(checkbox);

        taskItem.appendChild(checkboxWrapper);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);

        tasksList.appendChild(taskItem);
    });
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    renderTasks();
    updateTaskStats();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
updateTaskStats();

// AI Assistant Chat
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const suggestionButtons = document.querySelectorAll(".suggestion-btn");

function addMessage(sender, text) {
    const messageWrapper = document.createElement("div");
    messageWrapper.className = "message " + (sender === "user" ? "user-message" : "assistant-message");

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = text;

    messageWrapper.appendChild(messageContent);
    chatMessages.appendChild(messageWrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAssistantReply(question) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("attendance")) {
        return "Your current attendance is 85%. You are above the required 75% threshold.";
    }

    if (lowerQuestion.includes("today")) {
        return "Today you have: Data Structures class at 10:00 AM, Physics lab at 1:00 PM, and a library study session at 5:00 PM.";
    }

    if (lowerQuestion.includes("assignment") || lowerQuestion.includes("pending")) {
        return "Your pending assignments are: Mathematics assignment, Chemistry lab report, and English essay.";
    }

    if (lowerQuestion.includes("event") || lowerQuestion.includes("upcoming")) {
        return "Your upcoming event is the Quiz on October 5th at 11:00 AM.";
    }

    if (lowerQuestion.includes("hello") || lowerQuestion.includes("hi")) {
        return "Hello! How can I help you with your college schedule today?";
    }

    return "I can help with attendance, assignments, and your schedule. Try asking: 'What is my attendance?' or 'What do I have today?'";
}

sendBtn.addEventListener("click", function () {
    const question = chatInput.value.trim();

    if (question === "") {
        return;
    }

    addMessage("user", question);
    chatInput.value = "";

    const reply = getAssistantReply(question);
    addMessage("assistant", reply);
});

chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});

suggestionButtons.forEach(button => {
    button.addEventListener("click", function () {
        const question = button.getAttribute("data-question");
        chatInput.value = question;
        sendBtn.click();
    });
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", function () {
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
});

document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", function () {
        mobileMenu.style.display = "none";
    });
});
