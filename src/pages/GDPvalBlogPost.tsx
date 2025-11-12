import { ArrowLeft, Clock, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import profilePic from '@/assets/vishnu_lanka.jpg'; // Assuming same author
import { BarChart3 } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";

// Placeholder imports for new images
import gdpvalReviewProcess from '@/assets/gdpval_review_process.png';
import gdpvalPreferencesChart from '@/assets/gdpval_preferences_chart.png';
import gdpvalPerformanceTrend from '@/assets/gdpval_performance_trend.png';
import gdpvalFailureModes from '@/assets/gdpval_failure_modes.png';
// import gdpvalSpeedCost from '@/assets/gdpval_speed_cost.png';
// import gdpvalSectorPreferences from '@/assets/gdpval_sector_preferences.png';
// import gdpvalOccupationPreferences from '@/assets/gdpval_occupation_preferences.png';


const GDPvalBlogPostFull = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <TableOfContents />
          
          <div className="flex-1 max-w-4xl">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="ghost" className="mb-6 lg:mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8 lg:mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-glow rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">AI Evaluation</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
                OpenAI GDPval: The Evaluation of AI's Economic Potential
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                This post explores the methodology behind GDPval, its key findings, and what they might signal for the future of knowledge work. And the picture GDPval paints is far more interesting than any exam score.
              </p>

              {/* Author Info */}
              <Card className="p-4 lg:p-6 bg-gradient-card border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img 
                    src={profilePic}
                    alt="Vishnu Vardhan Sai Lanka"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <Link to="/authors" className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-base lg:text-lg hover:underline">
                        Vishnu Vardhan Sai Lanka
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm lg:text-base">AI Engineer</p>
                  </div>
                  <div className="text-xs lg:text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Beginner
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      October 14, 2025
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      10 min read
                    </div>
                  </div>
                </div>
              </Card>
            </header>

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-justify">
              <section className="mb-6 lg:mb-8">
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For years, the story of AI progress has been told through a series of escalating challenges. First, we measured it with games. Chess, then Go. These were good milestones, but they taught us a narrow lesson. They showed us that machines could master complex, but closed, systems with perfect information and clear rules. Then, we moved on to academic tests. SATs, AP exams, the Bar. This seemed like a step up. It showed AIs could absorb and reason over vast amounts of human text. But this, too, was a trap. Standardized tests are, by definition, standardized. They are clean distillations of messy reality, designed for objective grading. Real work isn't like that. Real work is messy, ambiguous, and subjective. It’s not about finding the one correct answer. It’s about creating a deliverable that someone else, a client, a boss, a customer finds valuable. It’s about taste, aesthetics, and understanding unstated context.
                </p>
              </section>

              <section className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">The Anatomy of a GDPval Task</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The core innovation of GDPval lies in its process built on deep human expertise from start to finish. Rather than having researchers invent tasks, the GDPval team sourced them directly from the real world. Let's walk through how a single data point is constructed.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Step 1: Selecting the Arena</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The process begins at a macroeconomic level. The researchers first identified the top 9 sectors contributing to U.S. GDP, such as "Finance and Insurance" and "Professional, Scientific, and Technical Services". Within each sector, they selected the five highest-earning "knowledge work" occupations, jobs that are predominantly digital. An occupation was deemed "digital" if a GPT-4o model classified at least 60% of its official O*NET task descriptions as being computer-based. This led to a set of 44 occupations, from Accountants and Lawyers to Software Developers and Financial Analysts.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Step 2: Recruiting the Experts</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  For each of the 44 occupations, the team recruited seasoned industry professionals. The bar was set remarkably high: experts were required to have a minimum of four years of experience and a strong professional history, with the average participant having <strong>14 years of experience</strong> in their field. These weren't junior employees; they were seasoned experts from firms like Goldman Sachs, Google, Disney, and major law firms.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Step 3: Creating the Task</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  An expert, say a Financial Analyst, is then prompted to create a task based on their actual work. An example from the paper is: <strong>"Create a competitor landscape for last mile delivery"</strong>. This involves three components:
                </p>
                <ul className="list-disc pl-4 lg:pl-6 space-y-2 lg:space-y-3 text-muted-foreground text-sm sm:text-base">
                  <li><strong>The Request:</strong> A detailed prompt that mirrors a real-world assignment.</li>
                  <li><strong>Reference Files:</strong> The raw materials needed to complete the task, such as spreadsheets, reports, or internal memos. A typical GDPval task has around 2 reference files, but some have as many as 38.</li>
                  <li><strong>The "Gold" Deliverable:</strong> The expert then completes the task themselves, producing a high-quality deliverable (e.g., a PowerPoint presentation) that serves as the human baseline. They also log the time it took, which averages around <strong>7-9 hours</strong> for tasks in the dataset.</li>
                </ul>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Step 4: Ensuring Quality and Representativeness</h3>
                <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalReviewProcess}
                    alt="Multi-stage review process flowchart"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Every task undergoes a rigorous, multi-stage review pipeline involving an average of five human reviews. This includes:
                </p>
                <ul className="list-disc pl-4 lg:pl-6 space-y-2 lg:space-y-3 text-muted-foreground text-sm sm:text-base">
                  <li>A <strong>generalist review</strong> to ensure it meets basic project guidelines.</li>
                  <li>An <strong>occupation-specific expert review</strong> to confirm the task is realistic, representative of the profession, and completable with the given materials.</li>
                  <li>A <strong>final iterative review loop</strong> with a lead reviewer to polish the task to a high standard.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">This meticulous process ensures the final task is not an academic exercise but a genuine slice of professional work.</p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Step 5: The Blind Evaluation</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Finally, the request and reference files are given to various AI models (e.g., GPT-5, Claude Opus 4.1). The resulting AI-generated deliverable and the original human-created deliverable are then presented, unlabeled, to a new set of occupational experts for a blind, pairwise comparison. The expert grader's job is simply to answer: "Which is better?" They consider not just correctness, but also subjective factors like structure, style, and aesthetics. The primary metric is the <strong>win rate</strong> of the model against the human expert.
                </p>
              </section>

              <section className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Key Findings: A Picture of an Emerging Workforce</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The results from GDPval provide a nuanced snapshot of where frontier AI stands today.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">1. Approaching, but Not Exceeding, Human Parity</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The top-performing model, Claude Opus 4.1, achieved a <strong>47.6% win-or-tie rate</strong> against industry experts. This means in nearly half of the tasks, a seasoned professional preferred or saw no difference in quality between the AI's work and that of their peers. While this is an impressive feat, it's crucial to note that "parity" isn't the ceiling.
                </p>
                <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalPreferencesChart}
                    alt="GDPval pairwise expert preferences bar chart"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">2. A Linear Trajectory of Improvement</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  When plotting the performance of OpenAI's frontier models over their release dates, a clear trend emerges: a roughly linear rate of improvement. The line doesn't appear to be flattening as it approaches the 50% "parity" mark, suggesting that current progress is not hitting a wall.
                </p>
                <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalPerformanceTrend}
                    alt="OpenAI frontier model performance over time"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">3. Different Models, Different Strengths</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The evaluation revealed distinct "personalities" among the top models. <strong>GPT-5 high</strong> was found to excel in <strong>accuracy</strong>, such as carefully following instructions and performing correct calculations. In contrast, <strong>Claude Opus 4.1</strong> excelled in <strong>aesthetics</strong>, like document formatting and slide layouts. This is corroborated by their failure modes. Experts most often rejected deliverables from models like Gemini and Grok for instruction-following failures. GPT-5 high had the fewest instruction-following issues but lost points on formatting, whereas Claude's weaknesses were more often related to accuracy. This suggests that choosing the "best" AI might soon become a matter of picking the right specialist for the task at hand.
                </p>
                <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalFailureModes}
                    alt="Failure Modes bar chart comparing models"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div>
              </section>

              <section className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">The Future Outlook: Speculations and Open Questions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  While the findings above are grounded in the paper's data, they invite speculation about the future trajectory of AI in the workplace.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">The Bottleneck is Shifting from Execution to Management</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The paper includes a fascinating analysis of potential speed and cost improvements. While a model can generate a deliverable in minutes that takes a human hours (a "naive" speedup of over 90x for GPT-5), the real-world savings are tempered by the need for human review and the probability of failure. In a realistic workflow where an expert reviews the AI's output and re-does the work if it's unsatisfactory, the effective speedup for GPT-5 drops to a much more modest <strong>1.4x</strong>.
                </p>
                {/* <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalSpeedCost}
                    alt="Speed and Cost Improvements scatter plot"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div> */}
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  This suggests a fundamental shift in the nature of knowledge work. The primary bottleneck may no longer be the time it takes to <strong>execute</strong> a task, but the time it takes to <strong>verify its quality and manage the AI agent</strong>. The most valuable skill in this new paradigm might not be raw execution, but the ability to write precise prompts, critically evaluate outputs, and effectively guide AI systems. The paper demonstrates this by showing a <strong>5 percentage point increase</strong> in GPT-5's win rate just from improved prompting and scaffolding.
                </p>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">The "Context Gap" Remains</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  Perhaps the most telling experiment is one buried in the appendix, where researchers created an "under-contextualized" version of GDPval by shortening the prompts and removing explicit instructions. The model had to infer more context. The result? Performance dropped. This highlights what may be the final frontier for AI capability: <strong>navigating ambiguity</strong>. A senior professional's value often lies not in executing a perfectly defined brief, but in taking a vague goal and figuring out the necessary steps, inputs, and constraints. Today's models are brilliant junior assistants who need a clear set of instructions. The ability to independently close this "context gap" is what separates a good assistant from a true colleague.
                </p>
              </section>


              <section className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">AI's Performance by Occupation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  By analyzing the occupation-specific win rates in GDPval, we can move beyond broad generalizations and identify the specific characteristics of professions most susceptible to AI disruption. The chart reveals a landscape of stark contrasts, where the underlying nature of a job's core tasks, rather than its prestige or complexity, determines its vulnerability.
                </p>
                {/* <div className="mb-6 lg:mb-8">
                  <img
                    src={gdpvalOccupationPreferences}
                    alt="GDPval pairwise expert preferences by occupation"
                    className="w-full h-auto rounded-lg lg:rounded-xl shadow-md object-cover"
                  />
                </div> */}
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Obvious Insights: The Highs and Lows</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  A direct reading of the chart shows clear performance disparities between professions:
                </p>
                <ul className="list-disc pl-4 lg:pl-6 space-y-2 lg:space-y-3 text-muted-foreground text-sm sm:text-base">
                  <li><strong>High-Susceptibility Occupations:</strong> Roles like <strong>Software Developers</strong> show remarkably high win-or-tie rates, with top models approaching <strong>70%</strong>. Similarly, occupations focused on structured data and process management, such as <strong>Financial & Investment Analysts</strong>, <strong>Order Clerks</strong>, and <strong>Sales Managers</strong>, also demonstrate strong performance for AI models. These are roles where the AI often performs at or above the level of an experienced human.</li>
                  <li><strong>Low-Susceptibility Occupations:</strong> Conversely, AI models struggle significantly in professions that demand deep subjective judgment and creative generation. <strong>Lawyers</strong>, <strong>Film & Video Editors</strong>, and <strong>Producers & Directors</strong> all exhibit low win rates across the board, often falling well below the 50% parity mark. Engineering roles like <strong>Mechanical</strong> and <strong>Industrial Engineers</strong> also show lower AI performance.</li>
                </ul>
                <h3 className="text-lg lg:text-xl font-semibold mt-4 lg:mt-6 mb-2">Non-Obvious Insights: The Principles of Disruption</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  The variance between occupations like Software Developers and Lawyers, both highly skilled roles in the same economic sector, reveals deeper principles about what makes a job's tasks amenable to AI:
                </p>
                <ol className="list-decimal pl-4 lg:pl-6 space-y-2 lg:space-y-3 text-muted-foreground text-sm sm:text-base">
                  <li><strong>Structured Logic vs. Ambiguous Interpretation:</strong> The core reason Software Developers have such a high win rate is that their primary medium—code—is a formal language with defined rules and syntax. The task is often to solve a logical problem within a structured system. Law, on the other hand, operates on ambiguous natural language. The most valuable legal work involves navigating subjectivity, crafting persuasive arguments, and interpreting intent, which are skills that current models find difficult to master.</li>
                  <li><strong>Information Synthesis vs. Novel Creation:</strong> Many of the high-performing roles involve <strong>synthesizing</strong> existing information. A financial analyst processes data to create a competitive landscape; an order clerk audits documents to find inconsistencies. AI excels at this rapid processing and restructuring of known data. In contrast, roles like Film Editor or Producer are centered on <strong>novel creation</strong>—building a narrative, evoking emotion, and making aesthetic judgments that don't have a single "correct" answer based on the inputs.</li>
                  <li><strong>Digitally Native vs. Physically Grounded Work:</strong> Even among computer-based tasks, there's a crucial distinction. The work of a software developer is purely digital. However, a Mechanical Engineer designing a 3D model of a machine part is performing a digital task that is ultimately <strong>grounded in the physics and constraints of the real world</strong>. This requires a form of spatial and physical intuition that is less developed in current models compared to their purely linguistic or logical reasoning abilities, likely contributing to lower win rates in engineering fields.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed mt-4 text-sm sm:text-base">
                  In conclusion, a profession's susceptibility to AI is not determined by its salary or required education level, but by the fundamental nature of its work. The more a job relies on formal logic, structured data, and the synthesis of existing information, the more likely it is that AI will become a powerful collaborator or competitor. The domains that remain most defensible are those built on ambiguity, subjective creativity, and a deep connection to the physical world. GDPval is a landmark study because it provides a map of this new territory. It shows us that the path to truly transformative AI is not just about building more powerful models, but about instilling them with the reliability, aesthetic sense, and contextual awareness that define expert human work.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GDPvalBlogPostFull;