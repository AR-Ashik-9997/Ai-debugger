# AI Code Debugger

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd "AI Code Debugger"
```

### 2. Create your environment variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual API key:

```
Debugger_API_KEY='your_actual_api_key_here'
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

## Important Notes

- **Never commit `.env` to git** - It contains sensitive API keys
- The `.gitignore` file is configured to exclude `.env` automatically
- Use `.env.example` as a template for setting up your local environment
