/* ============================================
   VARIÁVEIS GLOBAIS
   ============================================ */

let currentStep = 1;
const totalSteps = 8;

/* ============================================
   FORMULÁRIO MODAL - CONTROLE BÁSICO
   ============================================ */

function openForm(e) {
    if (e) {
        e.preventDefault();
    }
    console.log('Abrindo formulário...');
    
    // Rastrear quando o usuário abre o formulário
 if (typeof fbq !== 'undefined') {
    fbq('trackCustom', 'OpenApplicationForm');
}
    
    const formModal = document.getElementById('form');
    if (formModal) {
        formModal.classList.add('active');
        currentStep = 1;
        showStep(currentStep);
        console.log('Formulário aberto');
    } else {
        console.error('Elemento form não encontrado');
    }
}

function closeForm() {
    console.log('Fechando formulário...');
    const formModal = document.getElementById('form');
    if (formModal) {
        formModal.classList.remove('active');
    }
}

// Fechar ao clicar fora
const formModal = document.getElementById('form');
if (formModal) {
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeForm();
        }
    });
}

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeForm();
    }
});

/* ============================================
   MENU HAMBURGER
   ============================================ */

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (menuToggle && !e.target.closest('.navbar')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

/* ============================================
   FAQ ACORDEÃO
   ============================================ */

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqId = question.getAttribute('data-faq');
        const faqAnswer = document.getElementById(`faq-${faqId}`);
        
        if (faqAnswer) {
            question.classList.toggle('active');
            faqAnswer.classList.toggle('active');
        }
    });
});

/* ============================================
   NAVEGAÇÃO DO FORMULÁRIO EM ETAPAS
   ============================================ */

function showStep(step) {
    // Esconder todas as etapas
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (stepElement) {
            stepElement.style.display = 'none';
        }
    }

    // Mostrar etapa atual
    const currentStepElement = document.getElementById(`step-${step}`);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
    }

    // Atualizar contador
    const stepNumber = document.getElementById('stepNumber');
    if (stepNumber) {
        stepNumber.textContent = step;
    }

    // Atualizar botões
    updateButtons();

    // Scroll dentro do container do formulário
    setTimeout(() => {
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.scrollTop = 0;
        }
    }, 50);
}

function updateButtons() {
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const btnSubmit = document.getElementById('btnSubmit');

    if (btnPrev) {
        btnPrev.style.display = currentStep > 1 ? 'block' : 'none';
    }

    if (btnNext && btnSubmit) {
        if (currentStep < totalSteps) {
            btnNext.style.display = 'block';
            btnSubmit.style.display = 'none';
        } else {
            btnNext.style.display = 'none';
            btnSubmit.style.display = 'block';
        }
    }
}

function nextStep() {

    if (!validateStep(currentStep)) {
        return;
    }

    if (currentStep < totalSteps) {

        currentStep++;

        if (typeof fbq !== 'undefined') {

            if (currentStep === 4) {
                fbq('trackCustom', 'Application50');
            }

            if (currentStep === 8) {
                fbq('trackCustom', 'Application100');
            }

        }

        showStep(currentStep);

    }

}

/* ============================================
   VALIDAÇÃO DE CAMPOS
   ============================================ */

function validateStep(step) {
    const stepElement = document.getElementById(`step-${step}`);
    
    if (!stepElement) return false;

    const requiredFields = stepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = stepElement.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                highlightField(field);
            }
        } else {
            if (!field.value.trim()) {
                isValid = false;
                highlightField(field);
            } else {
                removeHighlight(field);
            }
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios marcados com *');
        return false;
    }

    return true;
}

function highlightField(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.style.borderLeft = '3px solid #dc2626';
        formGroup.style.paddingLeft = '10px';
    }
}

function removeHighlight(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.style.borderLeft = 'none';
        formGroup.style.paddingLeft = '0';
    }
}

/* ============================================
   ENVIO DO FORMULÁRIO
   ============================================ */

const multiStepForm = document.getElementById('multiStepForm');

if (multiStepForm) {
    multiStepForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateStep(totalSteps)) {
            return;
        }

        const formData = new FormData(multiStepForm);
        const actionUrl = multiStepForm.getAttribute('action');
        const btnSubmit = document.getElementById('btnSubmit');
        const originalText = btnSubmit.textContent;

        if (actionUrl.includes('XXXXX')) {
            alert('⚠️ ERRO:\n\nFormspree não configurado!\n\n1. Acesse formspree.io\n2. Crie uma conta\n3. Crie um novo formulário\n4. Use seu email: kaua94009@gmail.com\n5. Copie o ID (exemplo: mzzyqeeb)\n6. No index.html, substitua XXXXX por:\naction="https://formspree.io/f/SEU_ID"');
            return;
        }

        try {
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;

            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showSuccessMessage();
                closeForm();
                multiStepForm.reset();
                currentStep = 1;
            } else {
                console.error('Erro:', response.status);
                alert('Erro ao enviar. Verifique se o Formspree foi configurado corretamente.');
                btnSubmit.textContent = originalText;
                btnSubmit.disabled = false;
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar formulário. Verifique sua conexão.');
            btnSubmit.textContent = originalText;
            btnSubmit.disabled = false;
        }
    });
}

/* ============================================
   MENSAGEM DE SUCESSO
   ============================================ */

function showSuccessMessage() {

    if (typeof fbq !== 'undefined') {

        fbq('track', 'Lead', {
            content_name: 'Processo Seletivo Gran Doce',
            content_category: 'Recrutamento'
        });

    }

    const successMessage = document.getElementById('successMessage');

    if (successMessage) {

        successMessage.style.display = 'flex';

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

    }

}

/* ============================================
   SMOOTH SCROLL PARA LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#form') {
            e.preventDefault();
            openForm(e);
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   ANIMAÇÕES AO SCROLL
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

/* ============================================
   INICIALIZAÇÃO
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Página carregada');
    
    // Forçar scroll para o topo
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    showStep(1);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    console.log('✓ Script iniciado com sucesso');
});
