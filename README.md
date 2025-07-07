# Interactive Portfolio Website

A visually stunning, interactive personal portfolio website built with Flask, Tailwind CSS, GSAP, and AOS.js.

## Features

- **Modern Design**: Clean, bold typography with smooth animations and interactive elements
- **Responsive Layout**: Looks great on all devices from mobile to desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Animated Sections**: Smooth scroll effects, parallax sections, and entry animations
- **Interactive Elements**: Hover effects, micro-interactions, and animated components

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform) and AOS.js (Animate On Scroll)
- **Icons**: Font Awesome
- **Illustrations**: Lottie animations (optional)

## Project Structure

```
web/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── routes/
│   │   ├── __init__.py
│   │   └── main.py           # Main routes and view functions
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css     # Custom CSS styles
│   │   ├── js/
│   │   │   └── main.js       # Custom JavaScript
│   │   ├── images/           # Image assets
│   │   └── lottie/           # Lottie animation files
│   └── templates/
│       ├── base.html         # Base template with common elements
│       └── index.html        # Main portfolio page
├── run.py                    # Application entry point
└── requirements.txt          # Python dependencies
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd web
```

### 2. Create a virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python run.py
```

The application will be available at `http://127.0.0.1:5000/`.

## Customization Guide

### Personal Information

1. Edit `app/routes/main.py` to update your projects, skills, and experience data
2. Replace placeholder images in `app/static/images/` with your own
3. Update text in `app/templates/index.html` with your personal information

### Adding Projects

In `app/routes/main.py`, add new projects to the `projects` list:

```python
projects = [
    {
        'title': 'Your New Project',
        'description': 'Description of your project',
        'image': 'images/your-project-image.jpg',
        'tech_stack': ['Technology 1', 'Technology 2'],
        'link': 'https://your-project-link.com'
    },
    # ... existing projects
]
```

### Adding Skills

In `app/routes/main.py`, add new skills to the `skills` list:

```python
skills = [
    {'name': 'New Skill', 'percentage': 85},
    # ... existing skills
]
```

### Adding Experience

In `app/routes/main.py`, add new experience entries to the `experiences` list:

```python
experiences = [
    {
        'title': 'New Position',
        'company': 'Company Name',
        'period': 'Start Date - End Date',
        'description': 'Description of your role and responsibilities.'
    },
    # ... existing experiences
]
```

### Styling Customization

1. Edit color scheme in `app/templates/base.html` in the Tailwind configuration
2. Modify animations and transitions in `app/static/css/style.css`
3. Adjust JavaScript animations in `app/static/js/main.js`

## Deployment

### Heroku Deployment

1. Create a `Procfile` with:
   ```
   web: gunicorn "app:create_app()"
   ```

2. Add `gunicorn` to `requirements.txt`

3. Deploy to Heroku:
   ```bash
   heroku create your-portfolio-name
   git push heroku main
   ```

### Render Deployment

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn "app:create_app()"`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [AOS.js](https://michalsnik.github.io/aos/)
- [Font Awesome](https://fontawesome.com/)
- [Lottie](https://airbnb.io/lottie/) 