from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from app import mail
from flask_mail import Message

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Projects data based on Anshu's information with actual image files
    projects = [
        {
            'title': 'Contract Clause Extraction Tool',
            'description': 'NLP-powered Flask web application to automatically extract key legal clauses from contracts in PDF and TXT format, with Google Gemini AI integration for clause explanation.',
            'image': 'images/contract clause extraction tool.png',
            'tech_stack': ['Flask', 'NLP', 'spaCy', 'Google Gemini AI', 'Python'],
            'link': 'https://github.com/Anshu3721/Contract-Clause-Extractor-Tool'
        },
        {
            'title': 'Credit Risk Scoring App',
            'description': 'Production-ready system with FastAPI backend for ML predictions and Streamlit frontend, containerized with Docker for scalable deployment.',
            'image': 'images/credit risk scoring app.png',
            'tech_stack': ['FastAPI', 'Streamlit', 'Docker', 'Machine Learning', 'Python'],
            'link': 'https://github.com/Anshu3721/credit_risk'
        },
        {
            'title': 'Bangalore House Price Prediction',
            'description': 'Machine learning project to forecast house prices in Bangalore using Linear Regression and Random Forests with comprehensive data preprocessing.',
            'image': 'images/bangalore house price prediction.png',
            'tech_stack': ['Scikit-Learn', 'Python', 'Data Cleaning', 'Machine Learning'],
            'link': 'https://github.com/Anshu3721/Banglore_house_price_prediction'
        }
    ]
    
    # Skills data based on Anshu's information
    skills = [
        {'name': 'Python & Pandas', 'percentage': 95},
        {'name': 'Flask', 'percentage': 90},
        {'name': 'SQL & Databases', 'percentage': 85},
        {'name': 'Data Visualization', 'percentage': 88},
        {'name': 'NLP & Machine Learning', 'percentage': 80},
        {'name': 'LLM & Gen AI', 'percentage': 85},
        {'name': 'Google Cloud Platform', 'percentage': 75},
        {'name': 'Power BI / Apache Superset', 'percentage': 82},
        {'name': 'Automation', 'percentage': 92}
    ]
    
    # Experience data based on Anshu's information with expanded details
    experiences = [
        {
            'title': 'Data Analyst',
            'company': '',
            'period': 'Sep 2023 - Present',
            'description': 'Designed and implemented end-to-end automation solutions for telecom use cases, reducing client analysis time by 90% and effort by 85%. Developed and deployed a Flask web application for interactive site mapping and data analysis, optimizing cell tower performance. Created dynamic network topologies using pyvis and networkx libraries, enhancing network visualization and performance.'
        },
        {
            'title': 'Data Analyst',
            'company': 'EagletFly Solutions',
            'period': 'Jul 2022 - Jul 2023',
            'description': 'Engineered robust Python automation frameworks to handle high-volume telecom datasets, slashing analysis time by 90% and cutting manual effort by 85%. Built scalable pipelines for real-time data validation and transformation, accelerating insight delivery and boosting operational efficiency across teams. Enabled faster, more accurate decision-making by automating complex workflows that previously relied on manual processing.'
        }
    ]
    
    # Add achievements and responsibilities to each experience
    experiences[0]['achievements'] = [
        'Processed and analyzed data from multiple formats (Excel, CSV, JSON) to streamline automation tasks',
        'Built web applications with Python and Flask to support real-time data analysis and interactive features',
        'Automated data processing for telecom systems, improving operational efficiency by 90%',
        'Facilitated better network infrastructure and performance through high-quality data visualizations'
    ]
    
    experiences[1]['achievements'] = [
        'Developed Python scripts to automate repetitive data analysis tasks',
        'Created data validation frameworks that improved data quality and reliability',
        'Implemented real-time monitoring solutions for critical business metrics',
        'Collaborated with cross-functional teams to deliver insights that drove business decisions'
    ]
    
    return render_template('index.html', projects=projects, skills=skills, experiences=experiences)

@main_bp.route('/send-message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # For demonstration, just print the message
        print(f"Received message from {name} ({email}): {message}")
        
        # Uncomment to enable email sending
        """
        msg = Message(
            subject=f"Portfolio Contact from {name}",
            recipients=["your-email@example.com"],
            body=f"From: {name} <{email}>\n\n{message}"
        )
        mail.send(msg)
        """
        
        # Return JSON response for AJAX form submission
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    
    return redirect(url_for('main.index')) 