# Resume Shortlist

This project allows users to upload their resumes in PDF format, compare them to job descriptions, and apply for jobs or internships.

## Get Started

To get started with this project, follow these steps:

1. **Clone the Repository:**

```bash
git clone https://github.com/rohitp-18/resume-shortlist.git
cd resume-shortlist
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Run the Application:**

```bash
npm run dev
```

4. **Open in Browser:**
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Routes

### 1. Upload and Compare Resume

- **Endpoint:** `/short`
- **Method:** `POST`
- **Description:** Upload a resume in PDF format and compare it to a job description.

### 2. Apply for a Job

- **Endpoint:** `/job`
- **Method:** `POST`
- **Description:** Apply for a job using the uploaded resume.

### 3. Apply for an Internship

- **Endpoint:** `/internship`
- **Method:** `POST`
- **Description:** Apply for an internship using the uploaded resume.

## Usage

1. **Upload Resume and Compare:**

- Send a POST request to `/short` with the resume PDF and job description.

2. **Apply for a Job:**

- Send a POST request to `/job` with the necessary details.

3. **Apply for an Internship:**

- Send a POST request to `/internship` with the necessary details.

## Example

```bash
# Upload and compare resume
curl -X POST -F "resume=@path/to/resume.pdf" -F "job_description=Job description text" http://localhost:8000/short

# Apply for a job
curl -X POST -d "job_id=123" -d "resume_id=456" http://localhost:8000/job

# Apply for an internship
curl -X POST -d "internship_id=789" -d "resume_id=456" http://localhost:8000/internship
```

## License

This project is licensed under the MIT License.
