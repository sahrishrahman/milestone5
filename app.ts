// Declare jsPDF from the global scope, as it's loaded from a CDN
declare const jsPDF: any;

document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeDisplay = document.getElementById("resume-display") as HTMLElement;
    const shareableLinkContainer = document.getElementById("Shareable-link-container") as HTMLElement;
    const shareableLink = document.getElementById("Shareable-link") as HTMLAnchorElement;
    const downloadButton = document.getElementById("download-pdf") as HTMLButtonElement;

    // Handle form submission to generate resume and shareable link
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        // Collect form data
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLTextAreaElement).value;
        const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

        // Update resume display with formatted content
        resumeDisplay.innerHTML = `
            <h2>${name}'s Resume</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        // Generate a data URL for the resume content
        const resumeContent = `
            <html>
            <head><title>${name}'s Resume</title></head>
            <body>
            <h2>${name}'s Resume</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
            </body>
            </html>
        `;

        // Create a Blob for the resume content and generate a shareable URL
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const dataUrl = URL.createObjectURL(blob);

        // Set the shareable link
        shareableLink.href = dataUrl;
        shareableLink.textContent = "Click here to view your resume";
        shareableLinkContainer.style.display = "block";

        console.log("Shareable link generated: ", dataUrl);
    });
    console.log(typeof jsPDF); // Should log 'function'

    // Handle download as PDF functionality
    //
    downloadButton.addEventListener("click", () => {
        try {
            const doc = new jsPDF();
            const resumeText = resumeDisplay.textContent?.trim() || "";
    
            // Get the values correctly by casting to HTMLTextAreaElement or HTMLInputElement
            const education = (document.getElementById("education") as HTMLTextAreaElement).value;
            const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
            const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
            const username = (document.getElementById("username") as HTMLInputElement).value;
    
            // Add small chunks of content
            doc.text("Education: " + education, 10, 10);
            doc.text("Experience: " + experience, 10, 20);
            doc.text("Skills: " + skills, 10, 30);
    
            // Save the PDF with the username in the filename
            doc.save(`${username}_resume.pdf`);
        } catch (error) {
            console.error("Error generating PDF: ", error);
            alert("There was an error generating the PDF. Please try again.");
        }
    });
});