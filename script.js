const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}


const questionsAndAnswers = [
    { question: 'hi or Hi', answer: 'How can I help you?' },
    { question: 'What is SciAstra?', answer: 'SciAstra is a company that provides educational resources and courses to help students prepare for entrance exams for Indian research institutes such as IISc, IISERs, NISER, ISI, CMI, IACS, and CEBS.' },
    { question: 'What subjects are covered in SciAstra\'s courses?', answer: 'SciAstra\'s courses cover the four main subjects required for entrance exams to Indian Institutes of Science Education and Research (IISc), Indian Institutes of Science Education and Research (IISERs), National Institute of Science Education and Research (NISER), Indian Statistical Institute (ISI), Chennai Mathematical Institute (CMI), Institute of Advanced Study (IASc), and Centre for Earth and Space Sciences (CEBS). These subjects are Physics, Chemistry, Mathematics, and Biology (PCMB).' },
    { question: 'Course Duration', answer: 'The duration of the courses can vary depending on the choice of the course.' },
    { question: 'Is it online or offline', answer: 'SciAstra is an online educational platform.' },
    { question: 'What are SciAstra\'s missions or goals', answer: 'SciAstra\'s mission is to make students love science and prepare them for entrance exams to research institutes like IISc, IISERs, NISER, ISI, CMI, IACS, and CEBS. They aim to provide full preparation so that students won\'t need anything outside of their course. SciAstra also wants to provide support to students by offering interaction sessions, doubt classes, discussions, and emotional support.' },
    { question: 'How is SciAstra different or special from other platforms', answer: 'SciAstra distinguishes itself by offering full scholarships, minimal to zero fees, top international PhD placements, renowned faculties, and world-class infrastructure, setting it apart as an exceptional educational platform. Its unique features make quality education accessible, affordable, and globally competitive for aspiring students.' },
    { question: 'What are some success stories or achievements related to SciAstra', answer: '✅ All India Rank: 1, 7, 10, 12, 13, 15, 16, 17, 18, 20, 23.....in IISc, IISER, NISER, IACS, etc.\n✅ 1000+ Selections\n✅ 500+ Selections in IISERs\n✅ 100+ Selections in NISER and CEBS,\n✅ 10,000+ students mentored from our courses.\n✅ 100,000+ active community of dedicated students receiving career guidance & support.' },
    { question: 'What are contact details', answer: 'Contact Details:\nWebsite: www.sciastra.com\nPhone: 7570020363\nEmail: support@sciastra.com' },
    { question: 'What are the features', answer: 'SciAstra boasts distinguished faculties, outstanding results, comprehensive study materials, and expert mentors, ensuring a holistic educational experience for students.' },
    { question: 'Are there any demo lessons available', answer: 'Access a sneak peek into our online courses through Demo Classes, offering a concise preview guided by experienced mentors at SciAstra. Experience the educational excellence that awaits with a brief glance at our offerings.' },
    { question: 'What are some feedback from students', answer: 'Here are some of the feedbacks: Students like Apurv from the IISER 2021 batch express their gratitude for SciAstra, emphasizing the unparalleled support, teaching quality, and memorable journey. Dhirtiraj Bastav Katila from the IISER 2022 batch highlights the outstanding value for money, praising the exceptional course, mentors, materials, and urging others not to hesitate in seizing the opportunity.' },
    { question: 'Founders of SciAstra', answer: 'Vivek Dwivedi, a passionate 23-year-old teacher, serves as the Founder of SciAstra, embodying a commitment to education and driving the platform\'s vision.' },
    { question: 'Selection and Ranking through our platform?', answer: 'SciAstra boasts remarkable selections with talented individuals achieving notable ranks:\nAdarsh V - AIR 7 in IACS\nSakshi Ghosh - AIR 10 in IACS\nDebi Prasad - AIR 12 in NEST\nAdityarup - AIR 13 in KVPYs\nApoorva - AIR 18 in IISC Bengaluru\nShouvik Datta - AIR 1 in IAT' },
    { question: 'In what ways does SciAstra encourage students to think differently and embrace a scientific mindset?', answer: 'SciAstra nudges scientific curiosity through inquiry-based learning, strong fundamentals, diverse perspectives, and personalized exploration, all guided by passionate mentors.' },
];


const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    // Check if the user's message partially matches any predefined question
    const userQuestion = userMessage.trim().toLowerCase();
    const matchingQuestion = questionsAndAnswers.find(entry =>
        entry.question.toLowerCase().includes(userQuestion)
    );

    if (matchingQuestion) {
        // If there's a matching question, set its answer as the response
        messageElement.textContent = matchingQuestion.answer;
    } else {
        // If no matching question, display a default message
        messageElement.classList.add("error");
        messageElement.textContent = "I'm sorry, I couldn't understand that. Please try asking another question.";
    }

    // Scroll to the bottom of the chatbox
    chatbox.scrollTo(0, chatbox.scrollHeight);
}




const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

   
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
      
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));