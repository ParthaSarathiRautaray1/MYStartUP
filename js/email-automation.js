// Initialize EmailJS
emailjs.init("VFAVfk7APlN_I34jq"); // You'll get this when signing up

document.getElementById('contact_us_form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name_input').value,
        email: document.getElementById('email_input').value,
        phone: document.getElementById('phone_input').value,
        whatsapp: document.getElementById('whatsapp_input').value,
        interest: document.getElementById('interest_input').value
    };

    // Send email with PDF
    emailjs.send("service_7l3v81o", "template_nv0wo8s", {
        to_name: formData.name,
        to_email: formData.email,
        interest: formData.interest,
        pdf_link: "https://drive.google.com/file/d/1E0I4TrUxbIOrkC2G6kLSWXM1WZ8IECwg/view?usp=drive_link",
        message: `Here's your travel guide for ${formData.interest} packages`
    })
    // .then(() => {
        // Show success message
        showSuccessMessage();
        this.reset();
        
        // Open WhatsApp
        setTimeout(() => {
            const message = `Hello! I am ${formData.name}. I've received the travel guide and I'm interested in ${formData.interest} packages.`;
            const whatsappLink = `https://wa.me/919078859867?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');

        } , 2500)
       
        
    
       
    });





    // .then(() => {
    //     // Show success message first
    //     showSuccessMessage();
        
    //     // Store WhatsApp opening function
    //     const openWhatsApp = () => {
    //         const message = `Hello! I am ${formData.name}. I've received the travel guide and I'm interested in ${formData.interest} packages.`;
    //         const whatsappLink = `https://wa.me/919078859867?text=${encodeURIComponent(message)}`;
    //         window.open(whatsappLink, '_blank'); 
    //     };
    
    //     // Add click event to success message
    //     const successDiv = document.querySelector('.success-popup');
    //     if (successDiv) {
    //         successDiv.style.cursor = 'pointer';
    //         successDiv.addEventListener('click', openWhatsApp);
    //     }
    
    //     // Auto-open WhatsApp after success message
    //     setTimeout(openWhatsApp, 4000);
        
    //     // Reset form
    //     this.reset();
    // }).catch(error => {
    //     console.error('Error:', error);
    // });




function showSuccessMessage() {
    // Create and style the success message container
    const successDiv = document.createElement('div');
    successDiv.className = 'success-popup';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✨</div>
            <h3>Thank You!</h3>
            <p>Your travel guide has been sent to your email.</p>
            <p>Connecting you to WhatsApp for personalized assistance...</p>
            <div class="success-progress"></div>
        </div>
    `;

    // Add CSS styles
    const styles = `
        .success-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        }
        .success-content {
            text-align: center;
        }
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: bounce 1s infinite;
        }
        .success-progress {
            height: 3px;
            background: linear-gradient(to right, #4CAF50, #45a049);
            width: 0%;
            margin-top: 1rem;
            animation: progress 2s forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -40%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes progress {
            to { width: 100%; }
        }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Add to document
    document.body.appendChild(successDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 4000);
}

