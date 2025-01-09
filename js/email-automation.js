// Initialize EmailJS
emailjs.init("VFAVfk7APlN_I34jq"); // You'll get this when signing up

document.getElementById('contact_us_form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name_input').value,
        email: document.getElementById('email_input').value,
        phone: document.getElementById('phone_input').value,
        interest: document.getElementById('interest_input').value
    };

    // Send email with PDF
    emailjs.send("service_7l3v81o", "template_qh5ayz6", {
        to_name: formData.name,
        to_email: formData.email,
        interest: formData.interest,
        pdf_link: "https://drive.google.com/file/d/1E0I4TrUxbIOrkC2G6kLSWXM1WZ8IECwg/view?usp=drive_link"
    })
    .then(() => {
        // Show success message
        showSuccessMessage();
        
        // Open WhatsApp
        const message = `Hello! I am ${formData.name}. I've received the travel guide and I'm interested in ${formData.interest} packages.`;
        const whatsappLink = `https://wa.me/919078859867?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
        
        // Reset form
        this.reset();
    });
});

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <p>✅ Thank you for your interest! Check your email for travel documentation.</p>
        <p>Connecting you to WhatsApp for direct communication...</p>
    `;
    document.getElementById('contact_us_form').appendChild(successDiv);
}
