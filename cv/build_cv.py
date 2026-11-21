#!/usr/bin/env python3
"""Build the downloadable portfolio CV (Word style) and write private/errell-nino-cv.pdf.

Matches the existing dark-header Calibri/Carlito layout. Content is UX-first:
product ownership and AI-enabled delivery are supporting strengths.
"""
from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Inches, Pt, RGBColor, Twips, Emu

ROOT = Path(__file__).resolve().parents[1]
OUT_DOCX = ROOT / "cv" / "errell-nino-cv.docx"
OUT_PDF = ROOT / "private" / "errell-nino-cv.pdf"

HEADER_BG = RGBColor(0x0D, 0x11, 0x17)
SECTION_BG = RGBColor(0x1A, 0x1A, 0x2E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
BODY = RGBColor(0x1A, 0x1A, 0x1A)
GREY = RGBColor(0x5C, 0x63, 0x70)
MUTED = RGBColor(0x44, 0x44, 0x44)
TEAL = RGBColor(0x0A, 0x8F, 0x6A)
ACCENT_LINK = RGBColor(0x1A, 0x4F, 0x8B)

FONT = "Calibri"


def set_run(run, *, size=9, bold=False, italic=False, color=BODY, font=FONT, underline=False):
    run.font.name = font
    run._element.rPr.rFonts.set(qn("w:eastAsia"), font)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color
    if underline:
        run.font.underline = True
    # Avoid Word theme color overriding RGB
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is not None:
        rFonts.set(qn("w:ascii"), font)
        rFonts.set(qn("w:hAnsi"), font)
        rFonts.set(qn("w:cs"), font)


def set_spacing(p, *, before=0, after=0, line=1.08, exact=False):
    """line is a multiple of single spacing, unless exact=True, in which case line is pt."""
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if exact:
        pf.line_spacing_rule = WD_LINE_SPACING.EXACTLY
        pf.line_spacing = Pt(line)
    else:
        pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        pf.line_spacing = line


def shade(cell, color: RGBColor):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), f"{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_margins(cell, **sides):
    # sides in twips
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for edge, val in sides.items():
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:w"), str(val))
        el.set(qn("w:type"), "dxa")
        tcMar.append(el)
    tcPr.append(tcMar)


def no_borders(table):
    tbl = table._tbl
    tblPr = tbl.tblPr if tbl.tblPr is not None else OxmlElement("w:tblPr")
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "nil")
        el.set(qn("w:sz"), "0")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), "auto")
        borders.append(el)
    tblPr.append(borders)


def set_table_width(table, width_dxa):
    tbl = table._tbl
    tblPr = tbl.tblPr
    tblW = tblPr.find(qn("w:tblW"))
    if tblW is None:
        tblW = OxmlElement("w:tblW")
        tblPr.append(tblW)
    tblW.set(qn("w:w"), str(width_dxa))
    tblW.set(qn("w:type"), "dxa")
    lookup = tblPr.find(qn("w:tblLook"))
    # Prefer full-width by setting indent 0
    tblInd = tblPr.find(qn("w:tblInd"))
    if tblInd is None:
        tblInd = OxmlElement("w:tblInd")
        tblPr.append(tblInd)
    tblInd.set(qn("w:w"), "0")
    tblInd.set(qn("w:type"), "dxa")


def add_hyperlink(paragraph, text, url, size=9, color=ACCENT_LINK, bold=False):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    u = OxmlElement("w:u")
    u.set(qn("w:val"), "single")
    rPr.append(u)
    color_el = OxmlElement("w:color")
    color_el.set(qn("w:val"), f"{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    rPr.append(color_el)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(int(size * 2)))
    rPr.append(sz)
    szCs = OxmlElement("w:szCs")
    szCs.set(qn("w:val"), str(int(size * 2)))
    rPr.append(szCs)
    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rFonts.set(qn("w:cs"), FONT)
    rPr.append(rFonts)
    if bold:
        b = OxmlElement("w:b")
        rPr.append(b)
    new_run.append(rPr)
    text_el = OxmlElement("w:t")
    text_el.set(qn("xml:space"), "preserve")
    text_el.text = text
    new_run.append(text_el)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def para(doc, text="", *, size=9, bold=False, italic=False, color=BODY, before=0, after=0, align=None, space=1.08):
    p = doc.add_paragraph()
    set_spacing(p, before=before, after=after, line=space)
    if align:
        p.alignment = align
    if text:
        r = p.add_run(text)
        set_run(r, size=size, bold=bold, italic=italic, color=color)
    return p


def add_mixed(p, parts, size=9, color=BODY):
    """parts: list of (text, kwargs)"""
    for text, kw in parts:
        r = p.add_run(text)
        opts = dict(size=size, color=color)
        opts.update(kw)
        set_run(r, **opts)


def section_bar(doc, title, content_width_dxa):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    no_borders(table)
    set_table_width(table, content_width_dxa)
    cell = table.cell(0, 0)
    shade(cell, SECTION_BG)
    set_cell_margins(cell, top=40, bottom=40, left=80, right=80)
    p = cell.paragraphs[0]
    set_spacing(p, before=0, after=0, line=1.0)
    r = p.add_run(title.upper())
    set_run(r, size=8.5, bold=True, color=WHITE)
    # spacer after bar
    para(doc, before=0, after=0, space=0.25)


def header_block(doc, content_width_dxa):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    no_borders(table)
    set_table_width(table, content_width_dxa)
    cell = table.cell(0, 0)
    shade(cell, HEADER_BG)
    set_cell_margins(cell, top=70, bottom=80, left=140, right=140)
    p = cell.paragraphs[0]
    set_spacing(p, before=0, after=0, line=26, exact=True)
    r = p.add_run("ERRELL NIÑO")
    set_run(r, size=22, bold=True, color=WHITE)

    p = cell.add_paragraph()
    set_spacing(p, before=2, after=0, line=14, exact=True)
    r = p.add_run("UX Design Manager  ·  Senior UX Leader  ·  15+ Years Enterprise Experience")
    set_run(r, size=10, color=WHITE)

    p = cell.add_paragraph()
    set_spacing(p, before=2, after=2, line=12, exact=True)
    r = p.add_run("Manila, Philippines  ·  ")
    set_run(r, size=8, color=WHITE)
    add_hyperlink(p, "errellnino@gmail.com", "mailto:errellnino@gmail.com", size=8, color=WHITE)
    r = p.add_run("  ·  ")
    set_run(r, size=8, color=WHITE)
    add_hyperlink(p, "linkedin.com/in/e-nino", "https://www.linkedin.com/in/e-nino", size=8, color=WHITE)
    r = p.add_run("  ·  ")
    set_run(r, size=8, color=WHITE)
    add_hyperlink(p, "www.uxtap.me", "https://uxtap.me/", size=8, color=WHITE)

    para(doc, before=0, after=0, space=0.35)


def job_heading(doc, title, dates, content_width_dxa):
    p = para(doc, before=4, after=0, space=1.02)
    # right-aligned date via a tab stop at content width
    tab = p.paragraph_format.tab_stops.add_tab_stop(Twips(content_width_dxa), WD_TAB_ALIGNMENT.RIGHT)
    r = p.add_run(title)
    set_run(r, size=10.5, bold=True, color=BODY)
    r = p.add_run("\t" + dates)
    set_run(r, size=8, color=GREY)


def competency_table(doc, cats, content_width_dxa):
    # 2-col x 3-row
    rows = (len(cats) + 1) // 2
    table = doc.add_table(rows=rows, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    no_borders(table)
    set_table_width(table, content_width_dxa)
    col_w = content_width_dxa // 2
    for r_i in range(rows):
        for c_i in range(2):
            idx = r_i * 2 + c_i
            cell = table.cell(r_i, c_i)
            cell.width = Twips(col_w)
            set_cell_margins(cell, top=20, bottom=40, left=0, right=120)
            # clear default para
            p = cell.paragraphs[0]
            if idx >= len(cats):
                set_spacing(p, before=0, after=0, line=1.0)
                continue
            title, items = cats[idx]
            set_spacing(p, before=1, after=1, line=1.0)
            r = p.add_run(title)
            set_run(r, size=9, bold=True, color=BODY)
            p2 = cell.add_paragraph()
            set_spacing(p2, before=0, after=2, line=1.0)
            r = p2.add_run(items)
            set_run(r, size=8.5, color=BODY)


def bullet(doc, lead, text, *, after=1):
    p = para(doc, before=0, after=after, space=1.0)
    p.paragraph_format.left_indent = Cm(0.45)
    p.paragraph_format.first_line_indent = Cm(-0.35)
    r = p.add_run("▸  ")
    set_run(r, size=9, color=BODY)
    if lead:
        r = p.add_run(lead)
        set_run(r, size=9, bold=True, color=BODY)
    r = p.add_run(text)
    set_run(r, size=9, color=BODY)
    return p


def cert_row(doc, name, issuer, content_width_dxa, *, badge=None, issuer_url=None, name_extra_url=None):
    p = para(doc, before=1, after=1, space=1.0)
    p.paragraph_format.tab_stops.add_tab_stop(Twips(content_width_dxa), WD_TAB_ALIGNMENT.RIGHT)
    r = p.add_run(name)
    set_run(r, size=9, bold=True, color=BODY)
    if badge:
        r = p.add_run("  " + badge)
        set_run(r, size=8, bold=True, color=TEAL)
    r = p.add_run("\t")
    set_run(r, size=9, color=GREY)
    if issuer_url:
        add_hyperlink(p, issuer, issuer_url, size=8.5, color=ACCENT_LINK)
    else:
        r = p.add_run(issuer)
        set_run(r, size=8.5, color=GREY)


def tool_row(doc, label, items, label_width=Cm(3.6)):
    p = para(doc, before=0, after=1, space=1.0)
    r = p.add_run(label)
    set_run(r, size=9, bold=True, color=BODY)
    # pad with tab
    p.paragraph_format.tab_stops.add_tab_stop(label_width, WD_TAB_ALIGNMENT.LEFT)
    r = p.add_run("\t" + items)
    set_run(r, size=9, color=BODY)


def edu_row(doc, title, place, dates, content_width_dxa):
    p = para(doc, before=1, after=1, space=1.0)
    p.paragraph_format.tab_stops.add_tab_stop(Twips(content_width_dxa), WD_TAB_ALIGNMENT.RIGHT)
    r = p.add_run(title)
    set_run(r, size=9, bold=True, color=BODY)
    r = p.add_run("  ·  " + place)
    set_run(r, size=8.5, color=MUTED)
    r = p.add_run("\t" + dates)
    set_run(r, size=8.5, color=GREY)


def build():
    doc = Document()
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.4)
    section.right_margin = Cm(1.4)
    section.top_margin = Cm(0.95)
    section.bottom_margin = Cm(0.95)
    # usable width in twips: (21 - 2.8) cm = 18.2 cm = 18.2 * 567 = ~10319
    content_width_dxa = int((21.0 - 1.4 - 1.4) * 567)

    # Default style
    normal = doc.styles["Normal"]
    normal.font.name = FONT
    normal.font.size = Pt(9)
    normal.font.color.rgb = BODY

    header_block(doc, content_width_dxa)

    # ---- Summary
    section_bar(doc, "Professional Summary", content_width_dxa)
    p = para(doc, before=2, after=4, space=1.05)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_mixed(p, [
        ("Senior UX Design Manager and Strategic Design Leader with ", {}),
        ("15+ years of enterprise experience ", {"bold": True}),
        ("building and scaling high-performing design teams across ", {}),
        ("Banking, Fintech, and Technology Consulting", {"bold": True}),
        (" (Accenture, EY, IBM). Leads and mentors ", {}),
        ("10–15 UX designers", {"bold": True}),
        (" across Agile squads delivering regulated digital banking products. Proven track record applying Agile and Enterprise Design Thinking frameworks to transform complex regulatory and business requirements into intuitive, user-centred digital products at scale — including ", {}),
        ("BSP-compliant eKYC onboarding, unified payments UX, and UITF investment platforms", {"bold": True}),
        (". Hands-on with ", {}),
        ("Microsoft 365 Copilot Studio", {"bold": True}),
        ("; contributed as a front-line tester and prototype builder in the early phases of an enterprise AI platform, and ran AI training rollout sessions. Uses Claude, ChatGPT and Copilot to identify and validate UX use cases and prioritise backlogs, with reusable prompts and human review steps for accessibility, brand and compliance. Experienced in leading ", {}),
        ("5 concurrent Agile squads", {"bold": True}),
        (" and aligning design strategy with executive stakeholders at Fortune 500 organisations including Accenture, IBM, EY, AXA, and Sun Life Financial.", {}),
    ], size=9)

    # ---- Competencies
    section_bar(doc, "Core Competencies", content_width_dxa)
    competency_table(doc, [
        ("UX & Design Leadership",
         "User-Centered Design (UCD) · UX Research & Testing · Heuristic Evaluation · Wireframing & Prototyping · Design Sprints · Enterprise Design Thinking"),
        ("Service & Product Design",
         "Service Blueprints · Customer Journey Mapping · Use Case Analysis and Identification · Product Roadmapping & Vision · Design System Strategy · Reusable Component Libraries · Accessibility (WCAG 2.1 AA) · Resilient flows (auto-save, resume)"),
        ("Product & Project Management",
         "Agile & Scrum Methodologies · Product Ownership & Backlog Management · Stakeholder Management · Cross-Functional Team Leadership · MVP Definition · Release & Adoption · Scope & Business Development"),
        ("AI & GenAI Delivery",
         "AI use-case identification & validation · Use-case prioritisation · Prompt design with reusable prompts · Human-in-the-loop review · Responsible-AI guardrails (labelled AI output, accept/edit/reject) · Microsoft 365 Copilot Studio · AI training rollout & adoption"),
        ("Governance & Compliance",
         "BSP regulatory alignment (incl. eKYC) · Security & compliance requirements · Brand governance · WCAG 2.1 AA accessibility"),
        ("Industry Domains",
         "Banking & Financial Services · Fintech & Digital Banking · Wealth Management (UITF/Investments) · Payments & Transfers · Cloud Computing & AI · Enterprise SaaS Platforms"),
    ], content_width_dxa)

    # ---- Experience
    section_bar(doc, "Professional Experience", content_width_dxa)

    # Accenture
    job_heading(doc, "UX Design Manager / Project Manager / Squad UX Lead", "Mar 2022 – Present", content_width_dxa)
    para(doc, "Accenture Philippines · Embedded: Major Philippine Universal Bank (Confidential)",
         size=9, color=MUTED, before=0, after=0, space=1.0)
    para(doc,
         "Lead end-to-end UX strategy and execution for the bank’s digital retail banking platforms in a continuous delivery pipeline.",
         size=9, italic=True, color=MUTED, before=0, after=2, space=1.0)
    bullet(doc, "Squad Leadership & Agile Delivery: ",
           "Lead 5 concurrent cross-functional Agile/Scrum squads delivering eKYC onboarding and a unified payments hub, from vision and roadmap through backlog, release and adoption.")
    bullet(doc, "Enterprise AI Platform: ",
           "Part of the initial phases of building the organisation’s enterprise AI platform as front-line testers and prototype builders of its tools; hands-on with Microsoft 365 Copilot Studio, and ran AI training rollout sessions.")
    bullet(doc, "AI-Assisted Use-Case Prioritisation: ",
           "Use Claude, ChatGPT and Copilot to identify and validate UX use cases, surface user insights, and manage and prioritise backlog items, accelerating discovery-to-delivery cycles.")
    bullet(doc, "Digital Onboarding: ",
           "Redesigned account opening from branch-first to fully digital eKYC, with auto-saved, resumable progress for intermittent mobile data; reduced completion time and drop-off and improved first-attempt success within 90 days of launch.")
    bullet(doc, "Payments & Transfers: ",
           "Error-log analysis showed failures clustering on mobile data, where lag and timeouts drove double-submits. Unified fragmented payment touchpoints into a single hub with error prevention and recovery, substantially reducing transaction error rates, support volume and operating costs.")
    bullet(doc, "Design System: ",
           "Led the evolution of an enterprise-wide Design System with reusable component libraries, significantly reducing design-to-development handoff time across product squads.")
    bullet(doc, "Governance & Compliance: ",
           "Align all digital initiatives with BSP regulatory standards, security, compliance, brand governance, and WCAG 2.1 AA accessibility requirements.")
    bullet(doc, "People Leadership: ",
           "Lead and mentor 10–15 UX designers across squads, fostering a culture of evidence-based design and continuous professional growth.")

    # EY
    job_heading(doc, "User Experience Design Manager / Project Manager", "Nov 2020 – Nov 2021", content_width_dxa)
    para(doc, "Ernst & Young (EY) Global Consulting · Philippines",
         size=9, color=MUTED, before=0, after=0, space=1.0)
    para(doc,
         "Led digital design strategy for major enterprise banking accounts, serving as primary client interface for global engagements.",
         size=9, italic=True, color=MUTED, before=0, after=2, space=1.0)
    bullet(doc, "Strategic Client Leadership: ",
           "Served as primary UX contact for major global banking engagements; integrated strategic design vision into measurable delivery outcomes.")
    bullet(doc, "Enterprise Banking Transformation: ",
           "Led cross-functional teams on complex banking digitisation projects, ensuring alignment with international banking standards and regulatory requirements.")
    bullet(doc, "Team Development: ",
           "Mentored UX and Visual Design teams, establishing standards of excellence, quality frameworks, and continuous improvement practices.")
    bullet(doc, "Business Development: ",
           "Identified new opportunities and contributed to revenue growth by scoping and authoring proposals for future client engagements.")

    # IBM
    job_heading(doc, "Senior UX Designer / UX Technical Lead / Project Manager", "Dec 2019 – Nov 2020", content_width_dxa)
    para(doc, "IBM · American Technology Company (Hardware, Software, Cloud & AI Services)",
         size=9, color=MUTED, before=0, after=0, space=1.0)
    para(doc,
         "Oversaw end-to-end UX for AI and cloud computing enterprise products, focusing on scalable user-centric solutions.",
         size=9, italic=True, color=MUTED, before=0, after=2, space=1.0)
    bullet(doc, "AI & Cloud UX: ",
           "Designed user experiences for AI and cloud platform products, translating complex technical capabilities into intuitive enterprise interfaces.")
    bullet(doc, "Investment Platform (UITF): ",
           "Applied progressive disclosure and behavioural UX principles to a UITF investment platform, driving strong YoY growth in new investors and a measurable increase in assets under management within 6 months of launch.")
    bullet(doc, "Research-Based Design: ",
           "Conducted user research sessions and presented evidence-based design concepts to executive leadership; established organisational design standards (Enterprise Design Thinking).")

    # Mantu
    job_heading(doc, "Consultant, UX Technical Lead", "Aug 2019 – Dec 2019", content_width_dxa)
    para(doc, "Mantu – Amaris Consulting", size=9, color=MUTED, before=0, after=1, space=1.0)
    bullet(doc, "", "Delivered UX consultancy and technical design leadership for client digital transformation engagements.")

    # Stratpoint
    job_heading(doc, "Senior Lead UX/UI Designer", "Feb 2017 – Aug 2019", content_width_dxa)
    para(doc, "Stratpoint Technologies, Inc.", size=9, color=MUTED, before=0, after=1, space=1.0)
    bullet(doc, "Team Leadership: ",
           "Led the UI/UX Design Team; managed resource allocation, quality initiatives, and team efficiency across multiple product streams.")
    bullet(doc, "Design Development: ",
           "Delivered end-to-end design across fintech, e-commerce, and enterprise SaaS platforms — wireframes through high-fidelity production assets.")

    # Twist
    job_heading(doc, "Creative Director (UX/UI) / Design Lead", "May 2009 – Feb 2015", content_width_dxa)
    para(doc, "TwistResources, Inc.", size=9, color=MUTED, before=0, after=1, space=1.0)
    bullet(doc, "",
           "Led UX/UI and creative direction across digital products spanning FinTech, e-commerce, media, and professional networking verticals. Established design processes, visual identity systems, and reusable component standards for cross-functional product teams.")

    p = para(doc, before=4, after=4, space=1.0)
    add_mixed(p, [
        ("Earlier Career — ", {"italic": True, "bold": True, "size": 8, "color": MUTED}),
        ("iCanvasMedia (Creative Director, 2001–2008) · Cyber City Teleservices (Senior Web Designer, 1999–2001) · AOL Member Services Philippines (Tech Consultant, 1997–1999)",
         {"italic": True, "size": 8, "color": MUTED}),
    ])

    # ---- Achievements (short, non-duplicative, UITF not attributed to Accenture)
    section_bar(doc, "Key Achievements", content_width_dxa)
    bullet(doc, "",
           "Lead and mentor 10–15 UX designers across 5 concurrent Agile squads delivering regulated digital banking products — eKYC onboarding and a unified payments hub — in a continuous delivery model.")
    bullet(doc, "",
           "Redesigned a fragmented payments experience into a unified hub, informed by error-log analysis of mobile-data failures, substantially reducing transaction error rates, customer support volume, and associated operational costs.")
    bullet(doc, "",
           "Applied progressive disclosure and behavioural UX design to a UITF investment platform, driving strong growth in first-time investor adoption and measurable uplift in assets under management within six months of launch.")
    bullet(doc, "",
           "Established an enterprise-wide Design System adopted across multiple product teams, significantly reducing design-to-development handoff time and improving consistency at scale.")
    bullet(doc, "",
           "Used Claude, ChatGPT and Copilot to identify and validate UX use cases, surface user insights, and prioritise backlog items — and contributed as a front-line tester and prototype builder in the early phases of an enterprise AI platform, including Microsoft 365 Copilot Studio and AI training rollout.")
    bullet(doc, "",
           "Achieved WCAG 2.1 AA accessibility compliance across shipped digital products, including inclusive design patterns and full screen reader support.")

    # ---- Certs
    section_bar(doc, "Certifications & Professional Development", content_width_dxa)
    cert_row(doc, "Professional Scrum Product Owner II (PSPO II)", "Scrum.org",
             content_width_dxa, badge="NEW ★ 2026",
             issuer_url="https://www.scrum.org/user/154293")
    cert_row(doc, "Professional Scrum Master — AI Essentials (PSM-AE)", "Scrum.org",
             content_width_dxa, badge="NEW ★ 2026",
             issuer_url="https://www.scrum.org/user/154293")
    cert_row(doc, "Enterprise Design Thinking Practitioner", "IBM", content_width_dxa)
    cert_row(doc, "Certified Design Sprint Facilitator",
             "DLSU Graduate School of Business / SixSigma PH", content_width_dxa)
    cert_row(doc, "Certified Product Development Innovator",
             "DLSU Graduate School of Business", content_width_dxa)
    # Credly row with link
    p = para(doc, before=1, after=1, space=1.0)
    p.paragraph_format.tab_stops.add_tab_stop(Twips(content_width_dxa), WD_TAB_ALIGNMENT.RIGHT)
    r = p.add_run("Credly Verified Digital Badges")
    set_run(r, size=9, bold=True, color=BODY)
    r = p.add_run("\tUX Design & Agile Practices — ")
    set_run(r, size=8.5, color=GREY)
    add_hyperlink(p, "credly.com/users/errell", "https://www.credly.com/users/errell/", size=8.5, color=ACCENT_LINK)
    cert_row(doc, "Skillsoft Learning Path Completions",
             "UX Design · Product Management · Leadership", content_width_dxa)

    # ---- Tools
    section_bar(doc, "Tools & Technologies", content_width_dxa)
    tool_row(doc, "Design & Prototyping:", "Figma · Sketch · Adobe XD · InVision · Zeplin · Miro · FigJam")
    tool_row(doc, "Project & Agile:", "Jira · Confluence · Trello · Azure DevOps")
    tool_row(doc, "Research & Testing:", "UserTesting · Hotjar · Attention Insight · Clarity UX · Optimal Workshop · Maze")
    tool_row(doc, "AI & Vibe Coding:", "Microsoft 365 Copilot Studio · Claude (Anthropic) · ChatGPT (OpenAI) · Copilot · GitHub")
    tool_row(doc, "Methodologies:", "Agile/Scrum · Design Sprints · Enterprise Design Thinking · Lean UX · Service Design")

    # ---- Education
    section_bar(doc, "Education", content_width_dxa)
    edu_row(doc,
            "Bachelor’s Degree in Information Technology (Working-Class Programme)",
            "STI College, Quezon City, Philippines",
            "2022 – 2025", content_width_dxa)
    edu_row(doc,
            "Bachelor’s Degree in Nursing — PRC Registered Nurse (Renal/Haemodialysis)",
            "Angeles University Foundation, Philippines",
            "1992 – 1996", content_width_dxa)

    # Footer
    # thin line
    p = para(doc, before=5, after=1, space=0.8)
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    top = OxmlElement("w:top")
    top.set(qn("w:val"), "single")
    top.set(qn("w:sz"), "6")
    top.set(qn("w:space"), "8")
    top.set(qn("w:color"), "CCCCCC")
    pBdr.append(top)
    pPr.append(pBdr)
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    add_mixed(p, [
        ("Errell Niño  ·  UX Design Manager  ·  Manila, Philippines  ·  ", {"size": 7.5, "color": GREY}),
    ])
    add_hyperlink(p, "errellnino@gmail.com", "mailto:errellnino@gmail.com", size=7.5, color=GREY)
    r = p.add_run("  ·  ")
    set_run(r, size=7.5, color=GREY)
    add_hyperlink(p, "linkedin.com/in/e-nino", "https://www.linkedin.com/in/e-nino", size=7.5, color=GREY)
    r = p.add_run("  ·  ")
    set_run(r, size=7.5, color=GREY)
    add_hyperlink(p, "www.uxtap.me", "https://uxtap.me/", size=7.5, color=GREY)

    core = doc.core_properties
    core.author = "Errell Niño"
    core.title = "Errell Niño — UX Design Manager CV"
    core.subject = "UX Design Manager résumé"

    OUT_DOCX.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT_DOCX)
    return OUT_DOCX


def to_pdf(docx: Path) -> Path:
    """Convert with LibreOffice using a stable user profile (avoids lock conflicts)."""
    import os
    profile = Path("/tmp/lo-cv-profile")
    outdir = Path("/tmp/lo-cv-out")
    outdir.mkdir(parents=True, exist_ok=True)
    # Clear previous output so we never copy a stale PDF
    for old in outdir.glob("*.pdf"):
        old.unlink()
    result = subprocess.run(
        [
            "soffice", "--headless", "--nologo", "--nolockcheck", "--nodefault",
            f"-env:UserInstallation=file://{profile}",
            "--convert-to", "pdf", "--outdir", str(outdir), str(docx),
        ],
        capture_output=True,
        text=True,
        env=os.environ.copy(),
    )
    produced = next(outdir.glob("*.pdf"), None)
    if produced is None:
        raise SystemExit(f"LibreOffice did not write a PDF\nstdout: {result.stdout}\nstderr: {result.stderr}")
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    OUT_PDF.write_bytes(produced.read_bytes())
    return OUT_PDF


if __name__ == "__main__":
    docx = build()
    pdf = to_pdf(docx)
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
    pages = [l for l in info.splitlines() if l.startswith("Pages")]
    print("wrote", pdf, pages, "size", pdf.stat().st_size)
