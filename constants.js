import dotenv from 'dotenv'
dotenv.config()
const constants = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_PRIVATE_KEY: process.env.SUPABASE_PRIVATE_KEY,
  BEARER_TOKEN: process.env.BEARER_TOKEN,
  maxTokens: 2000,
  temperature: 0,
  kValue: 12,
  // openAIModel: 'gpt-4-32k-0613',
  // openAIModel: 'gpt-3.5-turbo-16k',
  openAIModel: 'gpt-4-0613',
  // openAIModel: 'gpt-4',
  chunkSize: 750,
  chunkOverlap: 250,
  userUploadedFilesDirectory: './public/userUploadedFiles',
  modules: {
    dueDilligenceV2: {
      systemPrompt: `
      Role: You are a due diligence expert with a background in startup assessment. 
      Task: Your task is to conduct a comprehensive due diligence on this startup. You cover all pertinent areas of inquiry that an investor would deem crucial before making an investment decision. 
      Task purpose: Your due diligence report will be instrumental in informing potential investors or partners about the viability, risks, and prospects of this startup. The findings from your assessment could make or break a multi-million-dollar investment decision.
      Language style: Your report should be clear, concise, and free of jargon. Assume that while your reader has business acumen, they might not be familiar with industry-specific terminologies or nuances. Avoid ambiguous statements. Any claim or observation should be backed by evidence, data, or clear rationale.
      Output format: You present your output in a very structured format with clear headings, subheadings, and bullets where appropriate, and you ensure the content has a coherent flow and avoid any repetition of points.

      This is your step-by-step approach to performing your the due diligence: 
      1) Areas to conduct due diligence: 
      You cover specific areas when you conduct your due diligence. You cover problem, solution, market, team, business model, go-to-market strategy, and traction. Your due diligence report outline covers all these areas and you use your <report outline> as your framework to conduct due diligence. 

      2) DD scope: 
      For each area you conduct due diligence, you brainstorm and analyse the following: 
      i) Positives: Investors and stakeholders are keen to understand the strengths of a startup. Highlighting the unique selling point, moat, or any other strengths paints a picture of the startup's potential. This analysis can be seen as a direct appeal to the reasons for considering an investment.
      ii) Negatives: A balanced report does not just extol the virtues but also delves into the challenges, pitfalls, or vulnerabilities a startup might face. This provides a risk assessment and showcases a well-rounded, unbiased view, building credibility for the entire report. Highlighting the negatives is pivotal for informed decision-making and preemptive strategizing.
      iii) Areas for Further DD: No single report can cover every nuance or angle of a startup. By pointing out areas that need deeper examination, it indicates a thorough approach and directs investors or stakeholders to aspects that might need specialized attention. This section ensures the due diligence remains an ongoing process and that the investment decision isn't taken based solely on the present report
      iv) Questions: Often, the process of evaluation raises queries that might not have immediate answers. Listing these questions serves a dual purpose. First, it showcases the depth of analysis, as good questions often stem from meticulous examination. Second, it sets the stage for further dialogue between the evaluator and the startup, fostering a more collaborative approach to the due diligence process
      Each section within the due diligence report consists of the following sub sections: i) overview of the section; ii) Positives; iii) Negatives; iv) Areas for Further DD; v) Questions. 

      3) Analyse startup data:
      All the <data> you analyse comes from documents received from the startup. You read, understand, and analyse all the data. The data is very unstructured and you take a step by step approach to identify patterns and insights to conduct the due diligence. These data are relevant for the area you’re conducting due diligence. You do not invent or make up fake information

      4) Write due diligence report: 
      After analysing all the data specific for this section, you start writing your analysis and findings section by section. When writing the <current section>, you also need to consider and review any <previous sections> you have already written for a natural flow and to avoid repetitions. 

      <report outline> = """
      Problem

      Overview: Precise articulation of the pain points issue being addressed, stressing its importance and relevance. Who’s facing the pain points. Describe the intensity, frequency and urgency of the pain points. Discussion of potential consequences if the problem remains unsolved.
      
      Positives: What makes this problem worth solving? Comment on its magnitude, relevance, and timely importance.
      
      Negatives: Are there any exaggerations or misconceptions related to the problem's portrayal?
      
      Areas for Further DD: Identify aspects of the problem statement that require deeper investigation.
      
      Questions: List pertinent questions about the problem that might need answers from the company or further research.
      
      Solution
      
      Overview: Clear explanation of the company's proposed solution, its features, its functionalities and how it works
      
      Positives: What stands out about this solution in addressing the identified problem effectively?
      
      Negatives: What potential gaps or shortcomings are evident in the proposed solution?
      
      Areas for Further DD: Which elements of the solution demand closer examination or validation?
      
      Questions: List pertinent questions about the solution that might need answers from the company or further research.
      
      
      Market
      Overview: Assessing the market size, growth prospects, trends and competitions. 
      
      Positives: What signs indicate that the startup has accurately gauged its market potential and demographics?
      
      Negatives: Where might the startup be overlooking or underestimating market challenges?
      
      Areas for Further DD: What market trends or segments should be delved into more deeply?
      
      Questions: List pertinent questions about the market that might need answers from the company or further research.
      
      
      Team
      Overview: Assessing the expertise, experience, and track record of the founding team and key executives.
      
      Positives: What aspects of the team's background, skills, or dynamics bolster the startup's potential for success?
      
      Negatives: What concerns arise regarding team experience, cohesion, or gaps in key roles?
      
      Areas for Further DD: Which part of the team assessment warrants a more detailed background examination?
      
      Questions: List pertinent questions about the team that might need answers from the company or further research.
      
      Business model
      Overview: What is the business model, how does the startup make money and where is the money coming from?
      
      Positives: What facets of the business model suggest robust revenue potential and adaptability?
      
      Negatives: Where might the startup be vulnerable due to its business model's limitations or dependencies?
      
      Areas for Further DD: What parts of the business model need closer scrutiny against industry norms?
      
      Questions: List pertinent questions about the business model that might need answers from the company or further research.?
      Go-to-market Strategy
      Overview: Company's plan to capture market share, including sales and marketing strategies.
      
      Positives: What strengths emerge from the startup's market entry plan, differentiation, and targeting?
      Negatives: Where could the startup be underprepared or overly optimistic in its market approach?
      
      Areas for Further DD: Which aspects of the go-to-market strategy require validation or benchmarking?
      
      Questions: List pertinent questions about the gtm that might need answers from the company or further research.?
       
      
      Traction
      Overview: Notable milestones of the company and user statistics. Significant partnerships or affiliations that boost the company's standing and recognition.
      
      Positives: What metrics or achievements showcase the startup's momentum and market validation?
      
      Negatives: Are there signs that suggest issues with growth, user retention, or market engagement?
      
      Areas for Further DD: What metrics or user feedback areas need a deeper dive to understand growth drivers or challenges?
      
      Questions: List pertinent questions about the traction that might need answers from the company or further research.?
      
      Recommendation: 
      Positives: Top 5 positives on the startup
      Negatives: Top 5 negatives on the startup
      Areas for Further DD: Top 5 areas of the startup to conduct further DD
      Questions: Top 10 comprehensive questions to ask the founder. 
      
       """
      `,
      reportOutline: {
        problem: {
          sectionLabel: 'Problem',
          sectionKey: 'problem',
          sectionOrder: 1,
          sectionDescription: `
        Overview: Precise articulation of the pain points issue being addressed, stressing its importance and relevance. Who’s facing the pain points. Describe the intensity, frequency and urgency of the pain points. Discussion of potential consequences if the problem remains unsolved.
      
        Positives: What makes this problem worth solving? Comment on its magnitude, relevance, and timely importance.
        
        Negatives: Are there any exaggerations or misconceptions related to the problem's portrayal?
        
        Areas for Further DD: Identify aspects of the problem statement that require deeper investigation.
        
        Questions: List pertinent questions about the problem that might need answers from the company or further research.`,
        },
        solution: {
          sectionLabel: 'Solution',
          sectionKey: 'solution',
          sectionOrder: 2,
          sectionDescription: `
        Overview: Clear explanation of the company's proposed solution, its features, its functionalities and how it works
      
        Positives: What stands out about this solution in addressing the identified problem effectively?
        
        Negatives: What potential gaps or shortcomings are evident in the proposed solution?
        
        Areas for Further DD: Which elements of the solution demand closer examination or validation?
        
        Questions: List pertinent questions about the solution that might need answers from the company or further research.
        `,
        },
        market: {
          sectionLabel: 'Market',
          sectionKey: 'market',
          sectionOrder: 3,
          sectionDescription: `
        Overview: Assessing the market size, growth prospects, trends and competitions. 
      
        Positives: What signs indicate that the startup has accurately gauged its market potential and demographics?
        
        Negatives: Where might the startup be overlooking or underestimating market challenges?
        
        Areas for Further DD: What market trends or segments should be delved into more deeply?
        
        Questions: List pertinent questions about the market that might need answers from the company or further research.`,
        },
        team: {
          sectionLabel: 'Team',
          sectionKey: 'team',
          sectionOrder: 4,
          sectionDescription: `
        Overview: Assessing the expertise, experience, and track record of the founding team and key executives.
      
        Positives: What aspects of the team's background, skills, or dynamics bolster the startup's potential for success?
        
        Negatives: What concerns arise regarding team experience, cohesion, or gaps in key roles?
        
        Areas for Further DD: Which part of the team assessment warrants a more detailed background examination?
        
        Questions: List pertinent questions about the team that might need answers from the company or further research.`,
        },
        businessModel: {
          sectionLabel: 'Business Model',
          sectionKey: 'businessModel',
          sectionOrder: 5,
          sectionDescription: `Overview: What is the business model, how does the startup make money and where is the money coming from?
      
        Positives: What facets of the business model suggest robust revenue potential and adaptability?
        
        Negatives: Where might the startup be vulnerable due to its business model's limitations or dependencies?
        
        Areas for Further DD: What parts of the business model need closer scrutiny against industry norms?
        
        Questions: List pertinent questions about the business model that might need answers from the company or further research?`,
        },
        goToMarketStrategy: {
          sectionLabel: 'Go-to-market Strategy',
          sectionKey: 'goToMarketStrategy',
          sectionOrder: 6,
          sectionDescription: `Overview: Company's plan to capture market share, including sales and marketing strategies.
      
        Positives: What strengths emerge from the startup's market entry plan, differentiation, and targeting?
        Negatives: Where could the startup be underprepared or overly optimistic in its market approach?
        
        Areas for Further DD: Which aspects of the go-to-market strategy require validation or benchmarking?
        
        Questions: List pertinent questions about the gtm that might need answers from the company or further research.?`,
        },
        traction: {
          sectionLabel: 'Traction',
          sectionKey: 'traction',
          sectionOrder: 7,
          sectionDescription: `Overview: Notable milestones of the company and user statistics. Significant partnerships or affiliations that boost the company's standing and recognition.
      
        Positives: What metrics or achievements showcase the startup's momentum and market validation?
        
        Negatives: Are there signs that suggest issues with growth, user retention, or market engagement?
        
        Areas for Further DD: What metrics or user feedback areas need a deeper dive to understand growth drivers or challenges?
        
        Questions: List pertinent questions about the traction that might need answers from the company or further research.?`,
        },
        recommendation: {
          sectionLabel: 'Recommendation',
          sectionKey: 'recommendation',
          sectionOrder: 8,
          sectionDescription: `Positives: Top 5 positives on the startup
        Negatives: Top 5 negatives on the startup
        Areas for Further DD: Top 5 areas of the startup to conduct further DD
        Questions: Top 10 comprehensive questions to ask the founder.`,
        },
      },

      // not using
      userMessage: `     
      <data> = """ text """

      <analysis> = Your independent assessment on the startup
      
      <current section> = """ text """
      
      <previous sections> = """ text """
      
      =====
      
      Follow all the instructions step by step, conduct an independent due diligence using all <data> on the startup and start writing the <current section> from the <report outline>.
      `,
    },
  },
  // investmentMemo Sectinos and reportOutline
  investmentMemoSections: {
    executiveSummary: {
      sectionKey: 'executiveSummary',
      sectionOrder: 12,
      sectionLabel: 'Executive Summary',
    },
    problemStatement: {
      sectionKey: 'problemStatement',
      sectionOrder: 1,
      sectionLabel: 'Problem Statement',
    },
    marketOpportunity: {
      sectionKey: 'marketOpportunity',
      sectionOrder: 2,
      sectionLabel: 'Market Opportunity',
    },
    solution: {
      sectionKey: 'solution',
      sectionOrder: 3,
      sectionLabel: 'Solution',
    },
    team: {
      sectionKey: 'team',
      sectionOrder: 4,
      sectionLabel: 'Team',
    },
    gotomarketStrategy: {
      sectionKey: 'gotomarketStrategy',
      sectionOrder: 5,
      sectionLabel: 'Go-to-market Strategy',
    },
    traction: {
      sectionKey: 'traction',
      sectionOrder: 6,
      sectionLabel: 'Traction',
    },
    competitiveAnalysis: {
      sectionKey: 'competitiveAnalysis',
      sectionOrder: 7,
      sectionLabel: 'Competitive Analysis',
    },
    riskAssessment: {
      sectionKey: 'riskAssessment',
      sectionOrder: 8,
      sectionLabel: 'Risk Assessment',
    },
    termsAndStructure: {
      sectionKey: 'termsAndStructure',
      sectionOrder: 9,
      sectionLabel: 'Terms and Structure',
    },
    investmentRationale: {
      sectionKey: 'investmentRationale',
      sectionOrder: 10,
      sectionLabel: 'Investment Rationale',
    },
    investmentThesis: {
      sectionKey: 'investmentThesis',
      sectionOrder: 11,
      sectionLabel: 'Investment Thesis',
    },
    // risksAndChallenges: 'Risks and Challenges',
    // financials: 'Financials',
    // valuationAndExitMultiple: 'Valuation and Exit Multiple',
  },

  promptTemplate: {
    systemMessageWithoutReportOutline: `Role: You are a high-performing venture capital analyst. 
    Task: Your task is to write an investment memo with in-depth analysis and insights for an investment opportunity.
    Task purpose: The investment memo will be read and significantly relied upon by the investment committee, consisting of high caliber investors, in order to make an investment decision about the company.
    Language style: As the memo will be key for decision making by investors, every sentence you write should be insightful, factual, not exaggerated and add value for the reader. The cold reader should not have to perform an intellectual workout to understand the meaning of any sentence you write.
    Output format: You present your output in a very structured format, using titles, subtitles and bullet points where appropriate (use html syntax), and you ensure the content has a coherent flow and avoid any repetition of points. You output in HTML format only. 
    
    This is your step-by-step approach to perform your task: 
    1) Report outline: These are guidelines for the content to cover when writing the investment memo. It has all the sections that your memo should contain, with a description of the content to be covered in each section. You will use the report outline as baseline to build the report by writing section by section. Below is the <report outline>.
    2) Company data: This is specific information about the company you are analysing and the <data> has been obtained from documents received from the company. You will use the company data to derive a thorough understanding of all information. You will then write from your understanding and not by copy pasting any information from the company data. 
    3) Analysis: These are notes you have made from your own analysis and observations of the company and relate to the current section you are writing. Your <analysis> always needs to be included when writing the current section.
    4) Start writing memo section by section: Using the Pyramid Principle created by Barbara Minto, you now start writing your memo section by section. When writing the <current section>, you also need to consider and review any <previous sections> you have already written. This will ensure the flow of your report and avoid any repetitive points.  Output in HTML format only.`,
    systemMessage: `Role: You are a high-performing venture capital analyst. 
    Task: Your task is to write an investment memo with in-depth analysis and insights for an investment opportunity.
    Task purpose: The investment memo will be read and significantly relied upon by the investment committee, consisting of high caliber investors, in order to make an investment decision about the company.
    Language style: As the memo will be key for decision making by investors, every sentence you write should be insightful, factual, not exaggerated and add value for the reader. The cold reader should not have to perform an intellectual workout to understand the meaning of any sentence you write.
    Output format: You present your output in a very structured format, using titles, subtitles and bullet points where appropriate (use html syntax), and you ensure the content has a coherent flow and avoid any repetition of points. You output in HTML format only. 
    
    This is your step-by-step approach to perform your task: 
    1) Report outline: These are guidelines for the content to cover when writing the investment memo. It has all the sections that your memo should contain, with a description of the content to be covered in each section. You will use the report outline as baseline to build the report by writing section by section. Below is the <report outline>.
    2) Company data: This is specific information about the company you are analysing and the <data> has been obtained from documents received from the company. You will use the company data to derive a thorough understanding of all information. You will then write from your understanding and not by copy pasting any information from the company data. 
    3) Analysis: These are notes you have made from your own analysis and observations of the company and relate to the current section you are writing. Your <analysis> always needs to be included when writing the current section.
    4) Start writing memo section by section: Using the Pyramid Principle created by Barbara Minto, you now start writing your memo section by section. When writing the <current section>, you also need to consider and review any <previous sections> you have already written. This will ensure the flow of your report and avoid any repetitive points.  Output in HTML format only. 
    
    <report outline> = """
    # Executive summary:
- Engaging introductory sentence, company introduction, required investment amount, core investment thesis.
- Emphasis on company's strategic advantage.
- Outline of investment usage for growth and expansion.

# Problem Statement:
- Precise articulation of the pressing issue being addressed, stressing its importance and relevance.
- Elaboration on affected demographics or industries.
- Discussion of potential consequences if the problem remains unsolved.

# Market Opportunity:
- Quantification of the potential market size with reliable sources and data.
- Discussion of target market size and demographic.
- Current and projected growth rates.

# Solution:
- Clear explanation of the company's proposed solution, unique features and benefits, including technical differentiators.
- Assessment of user experience, using customer testimonials or user testing data.

# Team:
- Introduction of each team member, their qualifications, and their roles.
- Past successes and relevant experience.
- Discussion on team dynamics and combined skills and how that makes them capable of executing the proposed solution.

# Go-to-market Strategy:
- Company's plan to capture market share, including sales and marketing strategies.
- Strategic partnerships and their potential benefits.
- Pathway to significant market share.

# Traction:
- Notable milestones of the company, user or developer adoption statistics.
- Significant partnerships or affiliations that boost the company's standing and recognition.

# Competitive Analysis:
- Identification of key competitors and their strategies.
- Company's unique positioning and advantages.
- Competitive edge and potential to succeed in the marketplace.

# Risk Assessment:
- Potential risks including technical, operational, and legal aspects.
- Potential regulatory challenges.
- Company's risk mitigation strategies and proactive management plan.

# Terms and Structure:
- Financial terms of the deal such as valuation, investment amount, and equity offered.
- Governance structure of the company including decision-making processes.
- Proposed distribution of equity or tokens.

# Investment Rationale:
- Company's current strengths.
- Attractiveness of the investment now and projected future potential.
- Unique factors making this opportunity appealing.

# Investment Thesis:
- Core assumptions underlying the project's success.
- Key milestones that validate these assumptions.
- Expected returns, including a base-case, worst-case, and best-case scenario.
"""`,

    // NOTE not using the below for now. added it directly to getSectionStream.ts
    userMessage: `
    You are now writing {section name}. 
    
    <data> = “”” {vector context} “””
    
    <notes> = “”” <user notes> “””
    
    <example> = “”” {example} “””
    
    <previous sections> = “”” {previous section} “””
    
    `,

    vectorDbQuery: {
      problemStatement: `- The pressing issue being addressed, its importance and relevance
      - Affected demographics or industries
      - Consequences if the problem remains unsolved
      `,

      marketOpportunity: `- Quantify the potential market size with data sources
      - Target market size and demographic
      - Current and projected growth rates
      
      `,
      solution: `- The company's proposed solution, unique features and benefits, technical differentiators
      - User experience, using customer testimonials or user testing data
      
      `,

      team: `
      - Introduction of each team member, their qualifications, and their roles. CV of team members
      - Team members’ past successes and experience
      - Team dynamics and strengths together as a team
      - Combined skills making them capable of executing the proposed solution
      - What makes the team appropriate for building this product
      `,

      gotomarketStrategy: `- Company's plan to capture market share, including sales and marketing strategies
      - Strategic partnerships and their potential benefits
      - Pathway to significant market share
      `,

      traction: `- Milestones of the company, user or developer adoption statistics
      - Partnerships or affiliations that boost the company's standing and recognition
      
      `,

      competitiveAnalysis: `- Identification of key competitors and their strategies
      - Company's unique positioning and advantages
      - Competitive edge and potential to succeed in the marketplace
      `,

      riskAssessment: `- Potential risks including technical, operational, and legal aspects
      - Potential regulatory challenges
      - Company's risk mitigation strategies and proactive management plan
      `,

      termsAndStructure: `- Financial terms of the deal such as valuation, investment amount, and equity offered
      - Governance structure of the company including decision-making processes
      - Proposed distribution of equity or tokens
      `,

      investmentRationale: `- Company's current strengths
      - Attractiveness of the investment now and projected future potential
      - Unique factors making this opportunity appealing
      `,
      investmentThesis: `- Core assumptions underlying the project's success
      - Key milestones that validate these assumptions
      - Expected returns, including a base-case, worst-case, and best-case scenario
      `,
    },
    reportOutline: {
      executiveSummary: `Engaging introductory sentence, company introduction, required investment amount, core investment thesis.
Emphasis on company's strategic advantage.
Outline of investment usage for growth and expansion.
`,

      problemStatement: `Precise articulation of the pressing issue being addressed, stressing its importance and relevance.
Elaboration on affected demographics or industries.
Discussion of potential consequences if the problem remains unsolved.
`,

      marketOpportunity: `Quantification of the potential market size with reliable sources and data.
Discussion of target market size and demographic.
Current and projected growth rates.
`,
      solution: `Clear explanation of the company's proposed solution, unique features and benefits, including technical differentiators.
Assessment of user experience, using customer testimonials or user testing data.
`,

      team: `Introduction of each team member, their qualifications, and their roles.
Past successes and relevant experience.
Discussion on team dynamics and combined skills and how that makes them capable of executing the proposed solution.
`,

      gotomarketStrategy: `Company's plan to capture market share, including sales and marketing strategies.
Strategic partnerships and their potential benefits.
Pathway to significant market share.
`,

      traction: `Notable milestones of the company, user or developer adoption statistics.
Significant partnerships or affiliations that boost the company's standing and recognition.
`,

      competitiveAnalysis: `Identification of key competitors and their strategies.
Company's unique positioning and advantages.
Competitive edge and potential to succeed in the marketplace.
`,

      riskAssessment: `Potential risks including technical, operational, and legal aspects.
Potential regulatory challenges.
Company's risk mitigation strategies and proactive management plan.
`,

      termsAndStructure: `Financial terms of the deal such as valuation, investment amount, and equity offered.
Governance structure of the company including decision-making processes.
Proposed distribution of equity or tokens.
`,

      investmentRationale: `Company's current strengths.
Attractiveness of the investment now and projected future potential.
Unique factors making this opportunity appealing.
`,
      investmentThesis: `Core assumptions underlying the project's success.
Key milestones that validate these assumptions.
Expected returns, including a base-case, worst-case, and best-case scenario.
`,
    },
    threeSixtyTemplate: {
      problemStatement: `Precise articulation of the pressing issue being addressed, stressing its importance and relevance.
Describe the intensity, frequency and urgency of pain points.
Discussion of potential consequences if the problem remains unsolved.

Next step:
- Areas to conduct further due diligence on problem
- Top 5 critical questions to ask the founder on problem
`,

      marketOpportunity: `Quantification of the potential market size with reliable sources and data.
Discussion of target market size and demographic.
Current and projected growth rates.

Next step
- Areas to conduct further due diligence on market opportunity
- Top 5 critical questions to ask the founder on market opportunity
`,
      solution: `Clear explanation of the company's proposed solution, unique features and benefits, including technical differentiators.
Assessment of user experience, using customer testimonials or user testing data.

Next step
- Areas to conduct further due diligence on Solution
- Top 5 critical questions to ask the founder on Solution
`,

      team: `Introduction of each team member, their qualifications, and their roles.
Past successes and relevant experience.
Discussion on team dynamics and combined skills and how that makes them capable of executing the proposed solution.

Next step
- Areas to conduct further due diligence on team
- Top 5 critical questions to ask the founder on team
`,

      gotomarketStrategy: `Company's plan to capture market share, including sales and marketing strategies.
Strategic partnerships and their potential benefits.
Pathway to significant market share.

Next step
- Areas to conduct further due diligence on GTM
- Top 5 critical questions to ask the founder on GTM
`,

      traction: `Notable milestones of the company, user or developer adoption statistics.
Significant partnerships or affiliations that boost the company's standing and recognition.

Next step
- Areas to conduct further due diligence on traction
- Top 5 critical questions to ask the founder on traction
`,

      competitiveAnalysis: `Identification of key competitors and their strategies.
Company's unique positioning and advantages.
Competitive edge and potential to succeed in the marketplace.

Next step
- Areas to conduct further due diligence on competition
- Top 5 critical questions to ask the founder on competition
`,

      riskAssessment: `Potential risks including technical, operational, and legal aspects.
Potential regulatory challenges.
Company's risk mitigation strategies and proactive management plan.

​​Next step
- Areas to conduct further due diligence on risk
- Top 5 critical questions to ask the founder on risk
`,

      termsAndStructure: `Financial terms of the deal such as valuation, investment amount, and equity offered.
Governance structure of the company including decision-making processes.
Proposed distribution of equity or tokens.

Next step
- Areas to conduct further due diligence on terms and structure
- Top 5 critical questions to ask the founder on terms and structure
`,

      investmentRationale: `Company's current strengths.
Attractiveness of the investment now and projected future potential.
Unique factors making this opportunity appealing.

Next step
- Areas to conduct further due diligence on the investment rationale
- Top 5 critical questions to ask the founder to validate investment rationale
`,
      investmentThesis: `Core assumptions underlying the project's success.
Key milestones that validate these assumptions.
Expected returns, including a base-case, worst-case, and best-case scenario.

Next step
- Areas to conduct further due diligence on the investment thesis
- Top 5 critical questions to ask the founder to validate investment thesis

`,
      executiveSummary: `Engaging introductory sentence, company introduction, required investment amount, core investment thesis.
Emphasis on company's strategic advantage.
Outline of investment usage for growth and expansion.
Next step.
`,
    },
  },

  imExamples: {
    uber: {
      executiveSummary: `
      Executive Summary 
      ==================
      
      -   Company Overview: Uber Technologies Inc., based in San Francisco, is a leading global ride-hailing company that has significantly disrupted the traditional taxi industry. The company has expanded into food delivery (Uber Eats) and freight logistics (Uber Freight).
      
      -   Problem: Uber addresses the issues of inconvenient, inconsistent, and sometimes unavailable traditional taxi services. It also provides a solution for the lack of flexible working opportunities for independent contractors.
      
      -   Solution: Through a digital platform, Uber connects drivers and riders in real-time, offering a more convenient and reliable transport service. The platform provides flexible work opportunities for drivers and is continually innovating to improve user experience and service efficiency.
      
      -   Market Opportunity: The global ride-hailing market is expected to grow significantly in the coming years. Uber's diversified services like food delivery and freight also tap into large and growing markets.
      
      -   Team: Uber's experienced management team, led by CEO Dara Khosrowshahi, has demonstrated an ability to navigate challenges and continue innovating and scaling the business.
      
      -   Go-to-Market Strategy: Uber has effectively employed a city-by-city expansion strategy, adapting to local regulations and customer preferences. The company continues to expand globally and diversify into new services.
      
      -   Traction: Uber operates in over 900 metropolitan areas worldwide and has a large and growing user base. The company has successfully diversified its revenue sources, showing strong growth particularly in its Uber Eats business.
      
      -   Competition: Uber faces competition from other ride-hailing companies like Lyft and Didi Chuxing, traditional taxi services, and public transportation. However, its first-mover advantage, global presence, and diversified offerings give it a strong competitive position.
      
      -   Risks: Regulatory challenges, driver and rider participation, competitive pressures, and technological disruptions are key risks. Uber's proactive risk management and diversified business model help mitigate these risks.
      
      -   Investment Rationale: Uber's dominant market position, strong revenue growth, innovative approach, resilience, and positive industry trends make it an attractive investment. It offers substantial upside potential from stock price appreciation and potential future dividends.
      
      -   Investment Thesis: Continued market growth, success in business diversification, and favorable regulatory trends underpin Uber's investment thesis. Achieving profitability and expansion in new business lines are key milestones that could yield substantial returns for investors.`,

      problemStatement: `
      Problem
      =======
      
      Uber emerged as a response to multiple challenges plaguing the traditional taxi system, such as inefficient ride-hailing, inconsistent pricing, lack of transparency, and limited opportunities for drivers. Here's how these problems manifested:
      
      1\. Inefficient Ride-Hailing in the Traditional Taxi System
      
      Traditional taxi services often left passengers waiting on the streets, especially in less populated areas or during peak hours. This problem manifested as:
      
      -   Difficulty in hailing taxis during peak hours and in less populated areas.
      
      -   Long waiting times causing inconvenience and inefficiency.
      
      -   Lack of predictability and convenience for the passengers.
      
      2\. Inconsistent Pricing and Payment Challenges
      
      Passengers often faced variable fares and an over-reliance on cash transactions in traditional taxi services. The inconsistency in pricing and payment presented problems such as:
      
      -   Unpredictable fare costs due to variable pricing based on time, distance, and location.
      
      -   Inconvenience of cash transactions, with safety concerns for drivers handling large sums of cash.
      
      -   Lack of transparency in pricing leading to passenger dissatisfaction.
      
      3\. Lack of Transparency and Accountability
      
      In the traditional taxi system, passengers had little information about the driver or the vehicle before the ride, leading to issues such as:
      
      -   Passenger safety concerns due to lack of driver and vehicle information.
      
      -   Difficulty in resolving issues like lost items due to inadequate tracking systems.
      
      -   Reduced accountability and transparency, impacting passenger trust.
      
      4\. Limited Earning Opportunities for Drivers
      
      Traditional taxi drivers faced high fees, rigid schedules, and limited range, restricting their earning potential. The limitations included:
      
      -   High licensing or leasing fees for drivers.
      
      -   Rigid schedules that limited flexibility and earning opportunities.
      
      -   Geographical constraints that restricted the driver's service area.
      
      5\. Inefficient Utilization of Vehicles
      
      Many personal vehicles sat idle for a significant part of the day, leading to inefficient resource use. This inefficient utilization posed problems such as:
      
      -   Unnecessary vehicle ownership and associated costs.
      
      -   Overcrowded roadways contributing to traffic congestion.
      
      -   Environmental concerns due to increased carbon emissions.
      
      In summary, Uber identified these key problems within the traditional taxi industry and sought to provide a comprehensive solution that revolutionized personal mobility.`,
      marketOpportunity: `
      
      Market Opportunity
      ==================
      
      Uber's technology-based solution addresses significant market gaps in the global taxi services industry, potentially unlocking massive value. Here's an exploration of the market opportunity:
      
      1\. Potential Market Value
      
      With a solution that efficiently addresses the challenges in traditional taxi systems, Uber has a considerable potential to unlock market value:
      
      -   Taxi & Limousine Market: As per Grand View Research, the global taxi and limousine services market size was valued at USD 83.0 billion in 2020 and is expected to grow at a compound annual growth rate (CAGR) of 8.3% from 2021 to 2028. Uber's innovative solutions position it to claim a significant share of this market.
      
      -   Ride-Hailing & Ride-Sharing: These services are projected to grow exponentially. According to Statista, the worldwide revenue from ride-hailing & ride-sharing segment is projected to reach US$260,159m in 2023. Given Uber's leading position in this space, it is well-placed to capitalize on this growth.
      
      2\. Size of the Target Market
      
      Uber's potential reach and scalability are vast, given its target market:
      
      -   Urban and Suburban Populations: Uber primarily targets urban and suburban populations, focusing on commuters, tourists, and individuals who prefer not to drive. With global urbanization on the rise, this market is expanding.
      
      -   Business Travelers and Corporations: Uber has also targeted the business segment with Uber for Business, providing convenient and reliable transport for employees.
      
      3\. Projections for Market Growth
      
      Several factors underline the long-term growth potential and sustainability of Uber's business:
      
      -   Growing Smartphone Penetration: With increasing smartphone penetration and internet access worldwide, more users are able to access ride-hailing services.
      
      -   Environmental Concerns: As environmental concerns rise, consumers are becoming more inclined towards sharing rides, potentially reducing the number of vehicles on the road.
      
      -   Changing Consumer Preferences: As people seek more convenience and safety, the demand for ride-hailing services is expected to rise.
      
      In summary, Uber's market opportunity is significant given the size of the taxi and limousine services market, the expansion of its target market with urbanization and corporate travel, and the projected market growth driven by increasing smartphone penetration, environmental concerns, and changing consumer preferences. Uber's technology-based solution is well-positioned to capitalize on these opportunities.`,
      solution: `
      
      Solution (S3)
      =============
      
      Uber's technology-powered solution has revolutionized the traditional taxi system, making ride-hailing more convenient, efficient, and safe. Here's how Uber's solution addresses key problems:
      
      1\. Real-Time Matching to Address Inefficient Ride-Hailing
      
      Using GPS technology and data analytics, Uber matches drivers with riders in real-time. Riders request a ride through the app, and the system identifies nearby drivers. The first driver to respond gets the ride, thus:
      
      -   Removing the need to wait on the street.
      
      -   Providing an efficient way to hail a ride.
      
      -   Reducing waiting times.
      
      2\. Dynamic and Transparent Pricing to Solve Inconsistent Pricing
      
      Uber's pricing algorithm, powered by machine learning, adjusts prices based on demand, trip distance, and traffic conditions. This system:
      
      -   Makes pricing transparent and predictable.
      
      -   Adjusts to the demand, offering fair prices.
      
      -   Shows estimated fare before the ride, increasing passenger confidence.
      
      3\. Cashless Transactions for Payment Challenges
      
      Uber integrates secure payment gateways, allowing automatic fare deduction after each ride. This approach:
      
      -   Makes transactions seamless and convenient.
      
      -   Enhances safety by reducing the need for drivers to handle cash.
      
      -   Allows integration with various online payment methods.
      
      4\. Enhanced Safety Features for Improved Accountability
      
      Uber uses technology to enhance safety and accountability. Features like in-app emergency button, ride tracking, and anonymized phone numbers are part of the Uber app, ensuring:
      
      -   Passenger and driver safety during the ride.
      
      -   Efficient issue resolution due to ride-tracking.
      
      -   Privacy protection through anonymized contact systems.
      
      5\. Flexible Work Opportunities to Empower Drivers
      
      Uber allows drivers to choose their work hours and ride acceptances. This:
      
      -   Provides drivers with a flexible work environment.
      
      -   Increases earning potential as earnings scale with the number of rides.
      
      -   Allows wider geographic reach for drivers.
      
      6\. Ride-Sharing for Optimal Vehicle Utilization
      
      Uber's algorithm matches riders going in the same direction, allowing ride-sharing. This efficient use of vehicles:
      
      -   Reduces the need for individual car ownership.
      
      -   Cuts down traffic congestion.
      
      -   Lowers environmental impact by reducing carbon emissions.
      
      In summary, Uber has effectively addressed the key issues of the traditional taxi industry. Through its technological innovations, Uber has improved the convenience, efficiency, and safety of ride-hailing services, creating a seamless experience for both drivers and riders.`,

      team: `
      
      Team 
      =====
      
      Uber's success can be largely attributed to its dynamic team of leaders who bring diverse and complementary skills to the table. This section focuses on the key members of the Uber team:
      
      1\. Founding Members
      
      -   Travis Kalanick: Co-founder and former CEO of Uber, Kalanick brought entrepreneurial skills from his previous ventures, RedSwoosh and Scour. His understanding of tech entrepreneurship played a crucial role in shaping Uber's initial journey.
      
      -   Garrett Camp: Co-founder and initial CEO, Camp conceptualized Uber. As the founder of StumbleUpon, he contributed his experience in tech startups and ideation, crucial for Uber's establishment and early growth.
      
      2\. Executive Leadership
      
      -   Dara Khosrowshahi: Current CEO, formerly CEO of Expedia, Khosrowshahi brings extensive experience in digital and travel industries. His strategic leadership has been instrumental in steering Uber through various challenges and expanding its global footprint.
      
      -   Nelson Chai: CFO of Uber, Chai has a strong background in financial services, including experience as CFO of CIT Group and NYSE Euronext. His financial acumen has been vital in managing Uber's financial strategies and its path towards profitability.
      
      3\. Technical Team
      
      Uber's robust technical team, led by CTO Sukumar Rathnam, drives the tech innovation at the company. Their expertise in areas like data science, machine learning, and mobile development supports Uber's advanced app functionalities and algorithms for rider-driver matching, dynamic pricing, and route optimization.
      
      4\. Operations and Marketing
      
      The operations and marketing teams play crucial roles in Uber's local and global success. They ensure efficient on-ground operations in cities worldwide and execute strategic marketing campaigns to increase user adoption.
      
      In summary, the Uber team comprises a blend of leadership skills, entrepreneurial spirit, financial acumen, technical expertise, and operations & marketing prowess. This diverse and capable team has been pivotal in transforming the vision of Uber into a global reality.`,
      gotomarketStrategy: `
      
      Go-to-market Strategy 
      ======================
      
      Uber's go-to-market (GTM) strategy has been a key driver in its rapid global expansion and strong market presence. Here's a breakdown of the strategic elements:
      
      1\. City-by-City Launch Strategy
      
      -   Localized Approach: Uber typically launches in a new city every few days, with a localized strategy to fit the market's unique characteristics. This approach allows Uber to understand the market needs better and adapt their service accordingly.
      
      -   Demand Analysis: Before entering a new market, Uber analyzes potential demand through 'phantom cabs' on the app, gauging interest levels to ensure adequate market potential.
      
      -   Regulatory Navigation: Uber is known for its 'ask forgiveness, not permission' strategy, launching in cities despite regulatory grey areas. While this has sometimes led to legal battles, it has also accelerated Uber's city-by-city expansion.
      
      2\. Driver and Rider Acquisition
      
      -   Driver Partnerships: Uber incentivizes local drivers with flexible working hours and earnings. They sometimes offer bonuses to new drivers, contributing to a larger fleet faster.
      
      -   Rider Acquisition: Uber focuses on enhancing user experience, offering promotional codes and discounted rides for new users. It often targets tech-savvy millennials who are quick to adopt and share new services.
      
      3\. Branding and Promotion
      
      -   Brand Positioning: Uber positions itself as a reliable, efficient, and economical alternative to traditional taxis. Its brand messaging revolves around convenience, safety, and innovation.
      
      -   Promotion: Uber uses social media, referral programs, and partnerships for promotional activities. Celebrity endorsements and collaborations with local businesses help increase visibility and appeal.
      
      4\. Diversification and Expansion
      
      -   Service Expansion: Uber has diversified into areas like food delivery (Uber Eats), freight transportation (Uber Freight), and even air taxis (Uber Elevate). This helps them cater to a wider range of customer needs and create additional revenue streams.
      
      -   Geographical Expansion: Uber's goal is to be 'everywhere for everyone'. They are continually venturing into new cities and countries, thereby expanding their global footprint.
      
      In conclusion, Uber's GTM strategy, with its localized approach, aggressive driver and rider acquisition, strong branding, and constant diversification and expansion, has successfully driven its massive growth.`,
      traction: `
      
      Traction 
      =========
      
      Uber's traction is demonstrated by its expansive user base, extensive geographical presence, and robust financial performance. Here's a closer look at Uber's impressive growth and traction to date:
      
      1\. User Base and Market Penetration
      
      -   User Growth: Uber has seen exponential growth in its user base. As of 2021, the platform has over 93 million active users per month globally.
      
      -   Geographical Presence: Uber operates in over 900 metropolitan areas worldwide, demonstrating its extensive reach and successful market penetration.
      
      2\. Financial Performance
      
      -   Revenue Growth: Uber has shown impressive revenue growth. As per Uber's 2021 annual report, it generated $11.14 billion in revenue, representing a significant improvement from the previous year.
      
      -   Diversified Revenue: Uber has successfully diversified its revenue streams, with Uber Eats and Uber Freight contributing a substantial portion of the total revenue. This demonstrates the effectiveness of Uber's expansion into new verticals.
      
      3\. Strategic Partnerships and Acquisitions
      
      -   Partnerships: Uber has partnered with various businesses, including restaurants (for Uber Eats), helicopter services (for Uber Copter), and local taxi services in certain markets. These partnerships have expanded Uber's service offerings and improved its market position.
      
      -   Acquisitions: Uber's strategic acquisitions, such as Postmates and Drizly, have further strengthened its market position and expanded its service portfolio.
      
      In summary, Uber's significant user growth, financial performance, and strategic partnerships and acquisitions provide strong evidence of the company's traction and successful execution of its business strategy.`,
      competitiveAnalysis: `
      
      Competitive Analysis
      ====================
      
      In the rapidly evolving ride-hailing market, Uber faces competition on multiple fronts. Here's a breakdown of the competitive landscape:
      
      1\. Direct Competitors
      
      -   Lyft: Uber's primary competitor in the US, Lyft operates a similar model. Although it has a smaller market share, Lyft has maintained competitive pressure with a reputation for better driver relations and customer service.
      
      -   Didi Chuxing: Predominantly in China, Didi ousted Uber in 2016. It continues to dominate the Chinese market and has begun expanding globally.
      
      -   Grab and Gojek: In Southeast Asia, these companies provide an array of services beyond ride-hailing, including food delivery and digital payments, posing a significant challenge to Uber in the region.
      
      2\. Traditional Taxi Services
      
      -   Traditional taxi services remain relevant competitors, especially in regions where ride-hailing regulations are stricter. They have also started adopting digital booking methods, trying to regain lost ground.
      
      3\. Public Transportation and Emerging Alternatives
      
      -   In urban areas, public transportation and emerging alternatives like bike/scooter sharing services can pose competition, offering cheaper or more environmentally friendly commuting options.
      
      4\. Competitive Positioning
      
      Despite the competition, Uber retains several advantages:
      
      -   First-Mover Advantage: Uber's first-mover advantage in many markets allowed it to build strong brand recognition and customer loyalty.
      
      -   Global Presence: Uber's extensive geographical footprint gives it a wider customer base and stronger market position compared to most competitors.
      
      -   Diversified Offerings: With Uber Eats, Uber Freight, and upcoming services like Uber Air, Uber's diversified service portfolio allows it to tap into multiple revenue streams and reduce dependence on ride-hailing.`,

      riskAssessment: `
      
      Risk Assessment 
      ================
      
      Despite its potential, Uber faces several risks that could impact its future performance:
      
      1\. Regulatory Challenges
      
      -   Uber's operations often fall into regulatory grey areas. Challenges from transportation and labor laws across different countries can lead to fines, restrictions, or operational changes, impacting profitability.
      
      2\. Dependence on Driver and Rider Participation
      
      -   Uber's business model depends on maintaining a large base of active drivers and riders. Any factors decreasing driver/rider participation (like dissatisfaction, better alternatives, safety issues) could adversely affect the business.
      
      3\. Competitive Pressures
      
      -   Intense competition in the ride-hailing market could put pressure on Uber's market share and pricing, affecting its revenue and growth prospects.
      
      4\. Technological Disruptions
      
      -   The advent of autonomous vehicles could disrupt Uber's business model. If competitors develop autonomous ride-hailing before Uber, it could significantly affect Uber's market position.
      
      Despite these risks, Uber's leadership position, diversification strategy, and ongoing efforts to navigate regulatory challenges position it to manage these risks effectively and continue on its growth trajectory.`,
      termsAndStructure: `
      
      Terms and Structure 
      ====================
      
      As a public company, Uber's investment structure is relatively straightforward, trading common stock on the NYSE under the ticker "UBER". The terms and structure of a potential investment would be dictated by public market dynamics, but the following key elements are worth noting:
      
      1\. Equity Structure
      
      -   Common Stock: Uber's equity is divided into shares of common stock. Each share carries one vote, with no additional classes of stock carrying special voting rights. This ensures equal voting power for all shareholders.
      
      -   Ownership: Uber's largest shareholders include institutional investors like Vanguard Group, BlackRock, and Morgan Stanley. Founders, executives, and employees also hold substantial equity, primarily through stock options.
      
      2\. Financial Performance and Valuation
      
      -   Revenue and Profitability: Despite being unprofitable, Uber has consistently grown its revenues. Investors should evaluate Uber's revenue growth, margin trends, and progress towards profitability to inform their investment decision.
      
      -   Stock Performance: Since its IPO in 2019, Uber's stock performance has seen ups and downs. Investors should consider the historical performance, current price, and market valuation in their investment decision.
      
      3\. Governance
      
      -   Board of Directors: Uber's board includes independent directors and representatives of significant shareholders. Their role is to oversee the company's strategy, performance, and risk management.
      
      -   Management: Uber's executive management, led by CEO Dara Khosrowshahi, is responsible for the day-to-day operations and execution of the company's strategic plan.
      
      In summary, an investment in Uber would involve purchasing publicly-traded common stock, with potential returns coming from stock price appreciation and any future dividends. The terms and structure of the investment are relatively straightforward but depend on the current stock price and broader market dynamics. Investors should carefully consider Uber's financial performance, valuation, and governance when making their investment decision.`,
      investmentRationale: `
      Investment Rationale 
      =====================
      
      Here are the five key reasons why Uber presents a compelling investment opportunity:
      
      1\. Dominant Market Position
      
      -   Established Brand: Uber, as one of the pioneers in the ride-sharing space, enjoys strong brand recognition and a substantial user base. Its position as a market leader allows it to wield considerable influence over the market dynamics.
      
      -   Global Reach: Operating in over 900 metropolitan areas worldwide, Uber has a global presence unmatched by most of its competitors. This expansive reach provides a solid platform for growth and revenue generation.
      
      2\. Strong Revenue Growth and Diversification
      
      -   Revenue Trajectory: Despite the challenges, Uber has demonstrated strong revenue growth, showing its ability to scale and monetize its user base effectively.
      
      -   Revenue Diversification: Uber's foray into new business lines, such as Uber Eats and Uber Freight, diversifies its revenue sources and reduces reliance on the core ride-hailing business.
      
      3\. Innovative and Forward-looking
      
      -   Tech-First Approach: Uber's technology-driven approach, characterized by constant innovation and user-centric design, has been crucial in maintaining its competitive edge. It also allows Uber to adapt quickly to changing market trends and user needs.
      
      -   Future Ventures: Uber is investing in future transportation solutions, such as self-driving cars and flying taxis (Uber Air). These ventures could open up new, potentially lucrative markets in the future.
      
      4\. Resilient Business Model
      
      -   Scalability: Uber's platform-based business model is highly scalable, allowing it to enter new markets and expand its services with relative ease.
      
      -   Resilience: Despite various obstacles, including regulatory pushback and global crises like the COVID-19 pandemic, Uber has shown resilience and an ability to adapt. This resilience bodes well for its future performance and risk management.
      
      5\. Positive Industry Trends
      
      -   Ride-Sharing Adoption: The ride-sharing industry is projected to grow at a significant rate, driven by urbanization, increasing smartphone penetration, and a cultural shift towards shared economy services.
      
      -   Food Delivery Market: The food delivery market, where Uber Eats operates, is also experiencing rapid growth, providing further avenues for Uber's expansion.
      
      In summary, Uber's dominant market position, strong revenue growth, innovative approach, resilience, and positive industry trends make it a compelling investment opportunity. Investors stand to gain from both its current strengths and its future growth potential.`,
      investmentThesis: `
      Investment Thesis
      =================
      
      The investment thesis for Uber rests on several key assumptions, milestones, and projected returns. Here are the details:
      
      1\. Assumptions Underlying Uber's Success
      
      -   Market Growth: The global ridesharing market is expected to grow substantially, fueled by urbanization, technological advancements, and changing consumer preferences. This growth should benefit market leaders like Uber.
      
      -   Diversification Success: It's assumed that Uber's diversification into food delivery (Uber Eats) and freight (Uber Freight) will continue to contribute significantly to revenue, mitigating risks associated with reliance on a single revenue stream.
      
      -   Regulatory Acceptance: Uber's continued success assumes a favorable regulatory environment or at least an ability to successfully navigate regulatory challenges in its operating markets.
      
      2\. Key Milestones
      
      -   Profitability: Achieving profitability is a critical milestone for Uber. Continued improvement in operational efficiency and cost management will be key indicators of progress towards this milestone.
      
      -   Expansion of New Business Lines: Success in expanding newer services like Uber Freight and advanced mobility solutions would validate Uber's diversification strategy and provide new growth engines.
      
      -   Advancement in Autonomous Vehicles: Progress in Uber's autonomous vehicle technology could be a game-changer, significantly reducing operational costs and providing a strong competitive advantage.
      
      3\. Expected Returns
      
      -   Stock Price Appreciation: As Uber continues to grow its revenue and move towards profitability, investors can expect significant stock price appreciation. Uber's diversified business model and continued expansion into new markets also provide multiple avenues for stock price growth.
      
      -   Potential Dividends: Once profitable, Uber may initiate dividend payments, providing another potential return avenue for investors.
      
      In conclusion, Uber's potential for continued market growth, success in business diversification, and favorable regulatory trends form the bedrock of this investment thesis. If Uber can successfully achieve key milestones like profitability and expansion of new business lines, it offers a compelling opportunity for substantial returns.`,
    },
  },

  investmentMemoSections_OLD_BEFORE_5June2023: {
    executiveSummary: 'Executive Summary',
    problemAndOpportunity: 'Problem and Opportunity',
    solution: 'Solution',
    team: 'Team',
    gotomarketAndTraction: 'Go-to-Market And Traction',
    competition: 'Competition',
    risksAndChallenges: 'Risks and Challenges',
    termsAndStructure: 'Terms and Structure',
    dealRationale: 'Deal Rationale',
    investmentThesis: 'Investment Thesis',
    // risksAndChallenges: 'Risks and Challenges',
    // financials: 'Financials',
    // valuationAndExitMultiple: 'Valuation and Exit Multiple',
  },
  promptTemplate_OLD_Before_5June2023: {
    instructionMessage: `You are a venture capital analyst. Your task is to provide in-depth analysis and insights for investment opportunities by writing an investment memo. The reader of the investment memo is the investment committee that consists of high caliber investors. They rely on the investment memo to make an investment decision. Your job is to write a detailed investment memo for the investment committee.`,
    reportConstruction: `You write the investment memo in a very structured manner by taking a step by step approach.
    
    #Report outline: You start by reading the report outline for the investment memo. Your outline contains several sections that you think are important for the reader to make an investment decision. Each section contains a description of what this specific section should cover. 
    
    #Document reading: After reading the outline, you read all documents you received as the context.

    #section writing: After reading the outline and the context provided, you start writing the section that you are asked to write for the investment memo.`,
    sectionBuilder: `You build the report by writing section by section. When you write the content for a section, you always take a step by step approach: you always have in mind the purpose of the report, who will read the report, how this will impact the reader’s decision making, a good understanding of the company, and the purpose of each section.  Using {R0 report outline}, notes and relevant information for (S1), write (S1).`,
    reportOutline: {
      executiveSummary: `Provide a succinct summary of the investment opportunity, focusing on the proposal, target round structure, a brief explanation of the investment thesis, company headquarters, and use of funds. Ensure that the most important details are clearly presented for decision-making purposes.`,

      problemAndOpportunity: `Identify the problem the project addresses and the opportunity it creates. Estimate the potential value that could be unlocked by solving the problem and the size of the target market(s). Emphasize the significance of the problem and the potential for market growth.`,

      solution: `Describe the project's solution to the problem in a step-by-step manner, focusing on technical aspects and user or developer experience. Ensure a comprehensive understanding of the solution, its workings, and its benefits from both technical and user perspectives.`,

      team: `Present a step-by-step overview of the founding team's background, their unique qualifications to solve the problem, team dynamics, and their history of working together. Discuss the team's strengths and expertise relevant to the project, and explain why they are well-suited for this venture.`,

      gotomarketAndTraction: `Explain the team's go-to-market strategy and current progress step by step. Include information on developer/user adoption, partnerships, and other relevant traction metrics. Emphasize the project's growth and accomplishments to date.`,

      competition: `Identify the main competitors in the space, and discuss step by step why the project is well-positioned to succeed against or alongside them. Examine the competitive landscape and the project's unique advantages.`,

      risksAndChallenges: `Outline the major risks and challenges the project faces, such as technical risks, execution risks, legal/compliance risks, etc., in a step-by-step manner. Focus on potential obstacles the project must overcome and their implications on the investment.`,

      termsAndStructure: `Provide a step-by-step description of the major commercial terms of the deal, involved entities, governance and control structure, equity cap-table, and token distribution. Offer a clear understanding of the legal and financial aspects of the investment.`,

      dealRationale: `Summarize the key reasons for the investment in a step-by-step manner, emphasizing the project's current strengths and advantages. Highlight the most compelling aspects of the opportunity.`,

      investmentThesis: `Present a forward-looking description of the assumptions made for the project to be successful, discussing each assumption step by step. Focus on the key milestones and events that must occur for the investment to yield the desired returns. `,
    },
  },
}

export default constants
