from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, re, requests

EMAIL = "YOUR_EMAIL_ID"
PWD = "YOUR_PASSWORD_HERE"
RESUME_PATH = "LINK/TO/YOUR/RESUME"
MAX_APPLIES = 5 

# Raw README URL for the 'dev' branch of the Summer2025-Internships repo
REPO_README = (
    "https://raw.githubusercontent.com/"
    "SimplifyJobs/Summer2025-Internships/dev/README.md"
)

# Set up Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
# options.add_argument('--headless')  # Uncomment to run without opening browser window
driver = webdriver.Chrome(options=options)


def login_github():
    """
    Log into GitHub to handle any private or protected links later.
    """
    driver.get("https://github.com/login")
    wait = WebDriverWait(driver, 10)
    user_field = wait.until(EC.presence_of_element_located((By.ID, "login_field")))
    pass_field = driver.find_element(By.ID, "password")
    user_field.send_keys(EMAIL)
    pass_field.send_keys(PWD)
    driver.find_element(By.NAME, "commit").click()
    time.sleep(5)


def get_job_links():
    """
    Fetch the repository README from the 'dev' branch,
    extract HTTP(S) links, and filter only internship postings.
    Returns a list of simplify.jobs company posting URLs.
    """
    resp = requests.get(REPO_README)
    resp.raise_for_status()
    print("Fetched README.md from branch 'dev'")

    all_links = re.findall(r"\[.*?\]\((https?://[^)]+)\)", resp.text)
    # Filter for company pages
    internship_links = [url for url in all_links if url.startswith("https://simplify.jobs/c/")]
    if not internship_links:
        raise Exception("No internship links found in README.md under /c/")
    selected = internship_links[:MAX_APPLIES]
    print(f"Selected internship URLs: {selected}")
    return selected


def apply_to_job(application_url):
    """
    Navigate to the given Simplify.jobs URL, click Apply, upload resume, and submit.
    """
    driver.get(application_url)
    wait = WebDriverWait(driver, 15)

    try:
        # Click the primary Apply button on the company page
        apply_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(translate(., 'apply', 'APPLY'), 'APPLY')]"))
        )
        apply_btn.click()
        time.sleep(2)

        # Wait for resume file input to appear
        file_input = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='file']"))
        )
        file_input.send_keys(RESUME_PATH)

        # Find and click submit within the apply form
        submit_btn = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
        )
        submit_btn.click()
        print(f"Applied successfully to: {application_url}")
        time.sleep(2)

    except Exception as e:
        # Diagnostic info
        print(f"Failed to apply to {application_url}: {type(e).__name__} - {e}")
        safe_name = application_url.replace('https://', '').replace('/', '_')
        driver.save_screenshot(f"debug_{safe_name}.png")


if __name__ == "__main__":
    login_github()
    job_links = get_job_links()
    for link in job_links:
        apply_to_job(link)
    driver.quit()
