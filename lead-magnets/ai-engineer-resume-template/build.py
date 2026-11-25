"""Build the AI engineer resume template download.

Source for public/downloads/ai-engineer-resume-template.zip, the newsletter-only bonus
offered on /blog/ai-engineer-resume (see NewsletterSignup `bonus` prop).

Outputs (into lead-magnets/ai-engineer-resume-template/out/):
  ai-engineer-resume-template.docx   editable template, placeholders only
  ai-engineer-resume-template.html   template + a filled, clearly labelled illustrative example
  README.txt

Then print the HTML to PDF with Chrome and zip the three files:

  cd lead-magnets/ai-engineer-resume-template
  uv run --with python-docx python build.py
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
    --no-pdf-header-footer --print-to-pdf=out/ai-engineer-resume-template.pdf \
    out/ai-engineer-resume-template.html
  (cd out && zip -X ../../../public/downloads/ai-engineer-resume-template.zip \
    ai-engineer-resume-template.docx ai-engineer-resume-template.pdf README.txt)

Rules: the example on page 2 is illustrative. Never put a real person, a real employer or a
real statistic in it. Keep the PDF at two pages.
"""

from html import escape
from pathlib import Path

from docx import Document
from docx.enum.text import WD_TAB_ALIGNMENT
from docx.shared import Cm, Pt, RGBColor

OUT = Path(__file__).parent / "out"
SITE = "aiengineerinsights.com/blog/ai-engineer-resume"

# Each resume is: name, contact line, then sections. A section is (heading, items).
# Items: ("p", text) | ("kv", label, text) | ("role", left, right) | ("b", text)

TEMPLATE = {
    "name": "[YOUR NAME]",
    "contact": "[City, Country] | [email] | [phone] | [linkedin.com/in/you] | [github.com/you]",
    "sections": [
        ("Summary", [
            ("p", "[Job title from the posting] with [N] years of software experience, [N] of them shipping LLM "
                  "features to production. [One line: the kind of system you build and the result you are known for.]"),
        ]),
        ("Skills", [
            ("kv", "Languages", "[Python, TypeScript, SQL: only what you can interview in]"),
            ("kv", "LLM and retrieval", "[RAG, embeddings, vector search, re-ranking, prompt design, structured output]"),
            ("kv", "Agents", "[tool calling, the framework you used, MCP]"),
            ("kv", "Evaluation", "[test sets, LLM-as-judge, regression checks in CI, tracing tool you used]"),
            ("kv", "Infrastructure", "[cloud you used, Docker, CI/CD, the model providers you have shipped with]"),
        ]),
        ("Experience", [
            ("role", "[Job title], [Company], [City or Remote]", "[Mon YYYY] to [Mon YYYY]"),
            ("b", "[Built WHAT for WHOM]; [RESULT with a number you measured] by [HOW: the technique or decision]."),
            ("b", "[Evaluation: built a test set of N cases; METRIC moved from A to B after CHANGE.]"),
            ("b", "[Cost or latency: cut cost per request or p95 latency from A to B by CHANGE, at the same quality score.]"),
            ("b", "[Reliability or safety: guardrail, approval step or fallback you added, and what it prevented.]"),
            ("role", "[Earlier job title], [Company], [City or Remote]", "[Mon YYYY] to [Mon YYYY]"),
            ("b", "[Strongest result first. Keep software bullets that show production ownership.]"),
            ("b", "[Two or three bullets are enough for older roles.]"),
        ]),
        ("Projects", [
            ("role", "[Project name], [link to repo or demo]", "[Stack in a few words]"),
            ("b", "[What it does and who uses it, in one line.]"),
            ("b", "[How you measured it: test set size, metric, result. Link the eval if it is public.]"),
        ]),
        ("Education", [
            ("role", "[Degree], [University]", "[Year]"),
        ]),
        ("Certifications, publications, open source (optional)", [
            ("b", "[Certification, issuer, year] | [Paper or talk, venue, year] | [Open-source project and your contribution]"),
        ]),
    ],
}

EXAMPLE = {
    "name": "Alex Sample",
    "contact": "City, Country | alex@example.com | linkedin.com/in/example | github.com/example",
    "sections": [
        ("Summary", [
            ("p", "AI engineer with 6 years of software experience, 2 of them shipping LLM features to production. "
                  "Builds retrieval and agent systems with evaluation in the release process."),
        ]),
        ("Skills", [
            ("kv", "Languages", "Python, TypeScript, SQL"),
            ("kv", "LLM and retrieval", "RAG, embeddings, hybrid search, re-ranking, structured output, prompt versioning"),
            ("kv", "Agents", "tool calling, LangGraph, MCP servers"),
            ("kv", "Evaluation", "test sets from production logs, LLM-as-judge, regression checks in CI, tracing"),
            ("kv", "Infrastructure", "AWS, Docker, CI/CD, hosted and open-weight models"),
        ]),
        ("Experience", [
            ("role", "AI Engineer, Company A (B2B software), Remote", "Jan 2025 to present"),
            ("b", "Built the retrieval pipeline for a support assistant over 40,000 help articles; hybrid search plus "
                  "re-ranking raised recall@5 from 0.62 to 0.84 on a 300-question test set."),
            ("b", "Versioned 14 production prompts in Git with a regression suite on every pull request; it caught "
                  "9 quality regressions before release in two quarters."),
            ("b", "Cut monthly model spend by 38% at the same evaluation score by routing short queries to a smaller "
                  "model and caching repeated prompts."),
            ("b", "Shipped an agent that drafts refund decisions with 6 internal tools; every payout needs human "
                  "approval; 71% of drafts were approved unedited across 2,100 cases."),
            ("role", "Software Engineer, Company B (payments), City", "Jul 2020 to Dec 2024"),
            ("b", "Added a document question-answering endpoint to a Python service used by 300 internal users; "
                  "p95 latency 2.1 s with streaming; a 120-case test set gates each deploy."),
            ("b", "Owned on-call for a payments API handling 4 million requests a day; reduced failed retries by "
                  "30% with idempotency keys."),
        ]),
        ("Projects", [
            ("role", "Contract question answering, github.com/example/contracts-qa", "Python, pgvector, FastAPI"),
            ("b", "Answers questions over 1,200 public contracts with cited passages; refuses when retrieval "
                  "confidence is low."),
            ("b", "Public evaluation: 200 labelled questions, faithfulness 0.93, results and failures in the README."),
        ]),
        ("Education", [
            ("role", "B.Tech, Computer Science, Example University", "2020"),
        ]),
    ],
}


def write_docx(data: dict, path: Path) -> None:
    doc = Document()
    sec = doc.sections[0]
    sec.left_margin = sec.right_margin = Cm(1.9)
    sec.top_margin = sec.bottom_margin = Cm(1.6)
    usable = sec.page_width - sec.left_margin - sec.right_margin
    base = doc.styles["Normal"]
    base.font.name = "Calibri"
    base.font.size = Pt(10.5)
    base.paragraph_format.space_after = Pt(2)

    p = doc.add_paragraph()
    r = p.add_run(data["name"])
    r.bold = True
    r.font.size = Pt(20)
    p = doc.add_paragraph(data["contact"])
    p.paragraph_format.space_after = Pt(6)

    for heading, items in data["sections"]:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        r = p.add_run(heading.upper())
        r.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = RGBColor(0x1F, 0x3A, 0x5F)
        for item in items:
            kind = item[0]
            if kind == "p":
                doc.add_paragraph(item[1])
            elif kind == "kv":
                p = doc.add_paragraph()
                p.add_run(item[1] + ": ").bold = True
                p.add_run(item[2])
            elif kind == "role":
                p = doc.add_paragraph()
                p.paragraph_format.space_before = Pt(4)
                p.paragraph_format.tab_stops.add_tab_stop(usable, WD_TAB_ALIGNMENT.RIGHT)
                p.add_run(item[1]).bold = True
                p.add_run("\t" + item[2])
            elif kind == "b":
                doc.add_paragraph(item[1], style="List Bullet")

    doc.add_paragraph()
    note = doc.add_paragraph()
    r = note.add_run(
        "Delete this note. Replace every [bracket]; delete sections you cannot fill. Use only numbers you measured "
        f"and can explain in an interview. Section-by-section guidance: {SITE}"
    )
    r.italic = True
    r.font.size = Pt(9)
    r.font.color.rgb = RGBColor(0x66, 0x66, 0x66)
    doc.save(path)


def resume_html(data: dict) -> str:
    out = [f"<h1>{escape(data['name'])}</h1>", f"<p class='contact'>{escape(data['contact'])}</p>"]
    for heading, items in data["sections"]:
        out.append(f"<h2>{escape(heading)}</h2>")
        in_list = False
        for item in items:
            if item[0] == "b":
                if not in_list:
                    out.append("<ul>")
                    in_list = True
                out.append(f"<li>{escape(item[1])}</li>")
                continue
            if in_list:
                out.append("</ul>")
                in_list = False
            if item[0] == "p":
                out.append(f"<p>{escape(item[1])}</p>")
            elif item[0] == "kv":
                out.append(f"<p class='kv'><b>{escape(item[1])}:</b> {escape(item[2])}</p>")
            elif item[0] == "role":
                out.append(f"<p class='role'><b>{escape(item[1])}</b><span>{escape(item[2])}</span></p>")
        if in_list:
            out.append("</ul>")
    return "\n".join(out)


CSS = """
@page { size: A4; margin: 13mm 15mm 11mm; }
* { box-sizing: border-box; }
body { font: 10.2pt/1.38 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1c1c1c; margin: 0; }
.tag { font-size: 8.2pt; letter-spacing: .5px; text-transform: uppercase; color: #fff; background: #b45309;
       display: inline-block; padding: 2px 8px; border-radius: 3px; margin-bottom: 8px; }
.tag.ex { background: #1f3a5f; }
h1 { font-size: 20pt; margin: 0 0 2px; letter-spacing: -.2px; }
.contact { margin: 0 0 6px; color: #444; font-size: 9.4pt; }
h2 { font-size: 10.4pt; text-transform: uppercase; letter-spacing: .7px; color: #1f3a5f;
     border-bottom: 1px solid #c9d2de; padding-bottom: 2px; margin: 11px 0 5px; }
p { margin: 0 0 3px; }
.role { display: flex; justify-content: space-between; gap: 12px; margin-top: 6px; }
.role span { color: #444; white-space: nowrap; }
ul { margin: 2px 0 4px; padding-left: 16px; }
li { margin-bottom: 2.2px; }
.note { margin-top: 12px; padding: 7px 10px; background: #fdf5ec; border-left: 3px solid #b45309; font-size: 8.8pt; color: #4a4036; }
.page2 { break-before: page; }
a { color: #b45309; text-decoration: none; }
"""


def write_html(path: Path) -> None:
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>AI Engineer Resume Template | AI Engineer Insights</title>
<style>{CSS}</style></head><body>
<div class="tag">Template: replace every [bracket]</div>
{resume_html(TEMPLATE)}
<div class="note"><b>How to fill it:</b> one page if you can, two at most. Every bullet:
what you built, the measured result, how you did it. Use only numbers you measured and can explain in an interview.
Mirror the wording of the job posting where it is true for you. Full guidance:
<a href="https://aiengineerinsights.com/blog/ai-engineer-resume/?utm_source=resume-template-pdf">{SITE}</a></div>
<div class="page2">
<div class="tag ex">Illustrative example. Not a real person, employer or result</div>
{resume_html(EXAMPLE)}
<div class="note"><b>About this example:</b> the name, companies and every number are made up to show the shape of a
finished page. Do not copy the numbers. Want a review of your own resume? Book a 1:1 session:
<a href="https://topmate.io/poorna_prudhvi_gurram?utm_source=aiengineerinsights&amp;utm_medium=pdf&amp;utm_campaign=resume-template-pdf">topmate.io/poorna_prudhvi_gurram</a></div>
</div>
</body></html>
"""
    path.write_text(html)


README = f"""AI Engineer Resume Template
aiengineerinsights.com

Files
  ai-engineer-resume-template.docx  Editable template. Opens in Word, Google Docs and Pages.
  ai-engineer-resume-template.pdf   Page 1: the template. Page 2: a filled example.

How to use
  1. Open the .docx and replace every [bracket]. Delete sections you cannot fill.
  2. Write each bullet as: what you built, the measured result, how you did it.
  3. Use only numbers you measured and can explain in an interview.
  4. Export to PDF unless the application form asks for another format.

The example on page 2 of the PDF is illustrative. The name, the companies and
every number in it are made up. Do not copy them.

Section-by-section guidance: https://{SITE}/
"""

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    write_docx(TEMPLATE, OUT / "ai-engineer-resume-template.docx")
    write_html(OUT / "ai-engineer-resume-template.html")
    (OUT / "README.txt").write_text(README)
    print("built", sorted(p.name for p in OUT.iterdir()))
