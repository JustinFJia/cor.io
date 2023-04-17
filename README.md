# 💃cor&#46;io💃

cor&#46;io is a web-based choreographing tool that simplifies the song and formation selection process so choreographers can focus on what really matters - the creative process.

## File Structure
- **app/** - contains the core functionality of the cor&#46;io application
  - **formations/** - contains the files for the formations suggestion portion of cor&#46;io
    - **formations&#46;py** - Python code for the formations suggestion functionality
  - **songs/** - contains the files for the songs suggestion portion of cor&#46;io
    - **songs&#46;py** - Python code for the songs suggestion functionality
- **static/** - contains the static components of the web portion of cor&#46;io
  - **img/** - contains the images for the web portion of cor&#46;io
    - There's no need to go in detail here so I won't
  - **js/** - contains the JavaScript for the web portion of cor&#46;io
    - **main&#46;js** - JavaScript code to drive website
  - **styles/** - contains the CSS for the web portion of cor&#46;io
    - **styles.css** - CSS styles to format website
- **templates/** - contains the HTML files for the web portion of cor&#46;io
  - **index&#46;html** - HTML template for website
- **README&#46;md** - you're reading this right now
- **requirements&#46;txt** - lists all the Python libraries that the app depends on

## Tech

cor&#46;io uses the following technologies to work properly:

- [framework] - As the core application is built on Python, <fill in> was used to <justification>

## Installation

Start by cloning this repository to your desired file location.

```sh
cd <yourdesiredfilepath>
git clone https://github.com/JustinFJia/cor.io.git
cd cor.io
```

Ensure that you have [Python](https://www.python.org/downloads/) and [pip](https://www.liquidweb.com/kb/install-pip-windows/) installed. The most recent version of Python should suffice.

```sh
python --version
pip -V
```

Install all the dependencies.

```sh
pip install -r requirements.txt
```
