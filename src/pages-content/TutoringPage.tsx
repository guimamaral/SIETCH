'use client';

import styles from './pages.module.css';

interface Testimonial {
  keywords: string[];
  review: string;
  rating: number;
  name: string;
  sessions: number;
}

const testimonials: Testimonial[] = [
  // TODO: Add your testimonials
  {
    keywords: ['Personalized Attention', 'Encouragement', 'Adaptability'],
    review: 'I am thrilled to commend Gui for their exceptional dedication and effectiveness as a tutor. Gui\s communication skills are truly remarkable, effortlessly breaking down complex concepts and making them accessible to all students. The learning environment they cultivate is not only supportive but also engaging, fostering a passion for the subject matter. Gui goes beyond the call of duty by adapting their teaching methods to suit individual learning styles, ensuring that each student receives the personalized attention they need to succeed. Their commitment to being available for additional support showcases a genuine investment in the academic success of their students. Gui\'s innovative and creative approach to teaching has not only made the learning experience enjoyable but has also led to noticeable progress and improvement among those under their guidance. Their professionalism and punctuality further underscore their dedication to the role of an outstanding educator. I am truly grateful for Gui\'s invaluable contribution to the academic journey of all students fortunate enough to have them as a tutor.',
    rating: 5,
    name: 'Amir',
    sessions: 55,
  },
  {
    keywords: ['Amazing', 'Knowledgeable', 'Accessible'],
    review: 'I would like to keep it simple but true review. "G" has been helping my son Shrihan (10th grader) in both computers and math. My son finished multiple sessions with so far and "G" is simply amazing in everything - Subject knowledge, changing his style based on students current knowledge, catching student pulse...etc and very important for everyone is - He is having tons of patience and very accessible on text ( Communication). Thank you "G" for you being you. :-)',
    rating: 5,
    name: 'Shrihan',
    sessions: 22,
  },
  {
    keywords: ['Knowledgeable', 'Flexible', 'Test Preparation'],
    review: 'My daughter is taking AP Computer Science Principles in high school this year. She had no prior knowledge of Computer Science and was very nervous about taking this class. Guilherme was able to break down complicated concepts and explain them in a way that are easy to understand. He also keeps her focused by interacting with her to make sure she understands it. Guilherme is very flexible on scheduling when my daughter needs additional help for test preparation. My daughter is doing very well in this class. She will continue to work with Guilherme. She is confident that she will do well on the AP test with Guilherme\'s help.',
    rating: 5,
    name: 'Sue',
    sessions: 36,
  },
  {
    keywords: ['Available', 'Patient', 'Knowledgeable'],
    review: 'Guilherme is a great tutor! He’s very patient and great at comp sci, he’s always available for my finals and helped me very much in my finals. My knowledge increased a lot in computer science because of him! Great guy!',
    rating: 5,
    name: 'Soad',
    sessions: 12,
  },
  {
    keywords: ['Patient', 'Knowledgeable'],
    review: 'Helped my son with his AP computer science assignments and really tried to be patient. He was very knowledgeable and answered all of my son’s questions',
    rating: 5,
    name: 'Sarwat',
    sessions: 1,
  },
  {
    keywords: ['Amazing', 'Knowledgeable', 'Accessible'],
    review: 'Guilherme is teaching my son AP computer science principles class. My son didn’t have much coding experience. Mr. G has triggered some interest and my son loves coding so much. He is doing ver well in his class maintaining high A s.',
    rating: 5,
    name: 'Baishali',
    sessions: 12,
  },
  {
    keywords: ['Affordable', 'Thorough', 'Knowledgeable'],
    review: 'Guilherme demonstrated remarkable knowledge and delved deep to ensure a thorough understanding of the solution process. He consistently paused to inquire about my comprehension of the material before proceeding with computer science-related questions.',
    rating: 5,
    name: 'Sam',
    sessions: 4,
  },
  {
    keywords: ['Compassionate', 'Patient', 'Genuine'],
    review: 'He is very patient. He helps you step by step, allowing you to understand an grasps the concept of each problem. Very genuine about the work itself. He’s very compassionate, he’s the best tutor by far.',
    rating: 5,
    name: 'Kirah',
    sessions: 6,
  },
  {
    keywords: ['Brilliant', 'Easygoing', 'Efficient'],
    review: 'Highly recommend this brilliant and easygoing tutor. He was informative and efficient in explaining the Computer Science concepts. He handled a student with dyslexia well too.',
    rating: 5,
    name: 'Courtney',
    sessions: 5,
  },
  {
    keywords: ['Knowledgeable', 'Helpful'],
    review: 'My son struggled with AP CS A. Very helpful in explaining concepts my son missed. He’s going through the A exam with my son this summer just so he has a better foundation in CS.',
    rating: 5,
    name: 'Colette',
    sessions: 25,
  },
  {
    keywords: ['Helpful'],
    review: 'Guilherme helped me very much with many topics from my Computer Science class. I learned a lot from my lessons with him and I found I understood the subject easier.',
    rating: 5,
    name: 'Caroline',
    sessions: 4,
  },
  {
    keywords: ['Recommended'],
    review: 'My child has had two lessons with Guilherme. He is helpful on computer science course that my child is taking. He explained the concept and project with patient. Highly recommended!',
    rating: 5,
    name: 'David',
    sessions: 5,
  },
  {
    keywords: ['Patient', 'Educated'],
    review: 'Great tutor very patient and educated. Really helped alot with an assignment for Java script. I\'m looking forward for the next session!',
    rating: 5,
    name: 'Marina',
    sessions: 1,
  },
  {
    keywords: ['Knowledgeable', 'Engaging', 'Above and Beyond'],
    review: 'We reached out to Guilherme to tutor my daughter for AP CS exam preparation. He was super friendly and flexible. Before diving in, made an effort to understand the knowledge gaps and recommended an approach to best prepare for the exam. He went above and beyond to provide us some additional tricks and tips for the exam. We are super happy with his tutor support and recommend him strongly. Thank you Guilherme.',
    rating: 5,
    name: 'Kalyan',
    sessions: 4,
  },
  {
    keywords: ['Perfect', 'Smart', 'Efficient'],
    review: 'Guilherme was switched onto exactly what my daughter needed. He is smart and understood exactly what the problem in the code was and worked with my daughter to remediate it quickly and teach her lessons along the way. She came away from the lesson with a deeper understanding of the process and much clearer responses. He is also very time efficient in his tutoring. Thank you Guilherme',
    rating: 5,
    name: 'Emelia',
    sessions: 1,
  },
  {
    keywords: ['Patient', 'Knowledgeable', 'Recommended'],
    review: 'Guilherme is very knowledgeable and patient, and he is always taking the time to ask if understand the concepts or not. He explains it in detail and helps a lot. Definitely recommended!',
    rating: 5,
    name: 'Eric',
    sessions: 6,
  },
  {
    keywords: ['Excellent', 'Proficient', 'Satisfied'],
    review: 'Gui is an awesome tutor, is proficient in Comp Sci and an excellent teaching method and focus on priblem solving. My child is fully satisfied in his approach to teaching comp sci.',
    rating: 5,
    name: 'Neel',
    sessions: 8,
  },
  {
    keywords: ['Helpful'],
    review: 'I got all the help I needed and more. If i need any help with computer science in the future I know who to get it from.',
    rating: 5,
    name: 'Jacob',
    sessions: 1,
  },
];

export function TutoringPage() {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>SHAI-HULUD</span>
        <span className={styles.siteDefinition}>the Fremen term for the sandworm of Arrakis</span>
      </div>
      <h2 className={styles.sectionTitle}>TUTORING</h2>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>What I Teach</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your tutoring topics */}
          <li>AP Computer Science A (Java)</li>
          <li>AP Computer Science Principles</li>
          <li>IB Computer Science</li>
          <li>Introductory Programming (Python, Java, C/C++)</li>
          <li>Data Structures & Algorithms (Python, Java, C/C++)</li>
          <li>Systems Programming (C/C++)</li>
          <li>Operating Systems (C/C++)</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Who It&apos;s For</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your target audience */}
          <li>High-School students</li>
          <li>University students</li>
          <li>Engineers preparing for technical interviews</li>
          <li>Self-taught developers looking to solidify fundamentals</li>
        </ul>
      </div>

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Track Record</h3>
        <ul className={styles.list}>
          {/* TODO: Replace with your metrics */}
          <li>1,000+ hours tutored (660+ on Wyzant)</li>
          <li>60+ students</li>
          <li>5.0 Star Rating</li>
        </ul>
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.paragraph}>
          Interested in working together?
        </p>
        <a
          href="mailto:your.email@example.com?subject=Tutoring Inquiry"
          className={styles.ctaButton}
        >
          {/* TODO: Update email */}
          Get in Touch →
        </a>
      </div>

      <hr className={styles.divider} />

      <div className={styles.subsection}>
        <h3 className={styles.subsectionTitle}>Testimonials</h3>
        <div className={styles.testimonialList}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.testimonialKeywords}>
                {testimonial.keywords.join(' • ')}
              </div>
              <div className={styles.testimonialRating}>
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className={styles.testimonialReview}>&quot;{testimonial.review}&quot;</p>
              <div className={styles.testimonialFooter}>
                <span className={styles.testimonialName}>— {testimonial.name}</span>
                <span className={styles.testimonialSessions}>{testimonial.sessions} sessions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quoteSection}>
        <span className={styles.quoteText}>&quot;Proper teaching is recognized with ease. 
                                                You can know it without fail because it awakens within you that sensation which tells you this is something you have always known.&quot;</span>
        <span className={styles.quoteAttribution}>— Frank Herbert</span>
      </div>
    </section>
  );
}
