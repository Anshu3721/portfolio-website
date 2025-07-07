import os
from datetime import datetime
from flask import Flask, render_template
from flask_mail import Mail

mail = Mail()

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MAIL_SERVER='smtp.example.com',
        MAIL_PORT=587,
        MAIL_USE_TLS=True,
        MAIL_USERNAME=os.environ.get('MAIL_USERNAME'),
        MAIL_PASSWORD=os.environ.get('MAIL_PASSWORD'),
        MAIL_DEFAULT_SENDER=('Anshu Kumar', 'anshukumar3721@gmail.com'),
    )
    
    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)
    
    # Initialize Flask-Mail
    mail.init_app(app)
    
    # Register blueprints
    from app.routes.main import main_bp
    app.register_blueprint(main_bp)
    
    # Add context processor for current year
    @app.context_processor
    def inject_now():
        return {'now': datetime.utcnow()}
    
    # Error handlers
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('errors/404.html'), 404
    
    @app.errorhandler(500)
    def internal_server_error(error):
        return render_template('errors/500.html'), 500
    
    return app 