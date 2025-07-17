import { FC, SVGProps } from 'react';
import ExpertIcon from './icons/verified_expert2.svg';
import ResearchIcon from './icons/verified_researcher2.svg';
import ScienceIcon from './icons/verified_science2.svg';

interface QualityModel {
    icon: FC<SVGProps<SVGSVGElement>>;
    title: string;
    desc: string;
    bgColor: string;
}

interface PrincipModel {
    desc: string;
}

export const qualities: QualityModel[] = [
    {
        icon: ResearchIcon,
        title: 'Рекомендации профессиональных сообществ',
        desc: 'Если материал отмечен этим знаком, это означает, что содержащаяся в нём информация основана на официальных рекомендациях ведущих медицинских и научных организаций в области здоровья и благополучия. В их числе — Всемирная организация здравоохранения (ВОЗ), Национальные институты здравоохранения (NIH), Центры по контролю и профилактике заболеваний (CDC), министерства здравоохранения различных стран, а также профильные профессиональные общества и ассоциации. Таким образом, рекомендации имеют научную обоснованность, подтверждённую опытом тысяч экспертов по всему миру.',
        bgColor: '#F5E6D1',
    },
    {
        icon: ScienceIcon,
        title: 'Подтверждено\nисследованиями',
        desc: 'Этот знак означает, что эффективность и безопасность представленных рекомендаций подтверждены как в теории, так и на практике. Информация опирается на результаты масштабных клинических испытаний и лабораторных исследований, прошедших независимую экспертную оценку и опубликованных в авторитетных научных изданиях, таких как The Lancet, Nature, Science и другие. Именно такие публикации лежат в основе официальных рекомендаций в сфере правильного питания, физической активности, полноценного сна, управления стрессом и других аспектов здорового образа жизни. Материалы регулярно обновляются с учётом появления новых данных и научных открытий, что позволяет обеспечить их актуальность и соответствие современным медицинским стандартам.',
        bgColor: '#C3DECB',
    },
    {
        icon: ExpertIcon,
        title: 'Мнение\nэкспертов',
        desc: 'Если материал отмечен этим знаком, это означает, что информация в нём основана на профессиональном мнении специалистов, обладающих многолетним опытом работы в своей области. Это могут быть нутрициологи, сомнологи, психологи, сертифицированные тренеры и другие практикующие эксперты в области здоровья и благополучия. Все рекомендации специалистов проходят редакционную проверку, а также соотносятся с актуальными научными данными и принципами доказательной медицины.',
        bgColor: '#F6D7E4',
    },
];

export const princips: PrincipModel[] = [
    {
        desc: 'Смотреть первоисточники. Если наши специалисты или авторы ссылаются на исследования, мы обязательно изучаем оригинальные работы и проверяем их на соответствие современным научным представлениям.',
    },
    {
        desc: 'Проверять высказывания экспертов. Мы не полагаемся только на регалии и места работы специалистов — все утверждения проверяются на соответствие доказательной базе.',
    },
    {
        desc: 'Следовать рекомендациям профессиональных сообществ. Мы используем только рекомендации, признанные авторитетными медицинскими и профессиональными организациями в области здоровья.',
    },
    {
        desc: 'Обновлять информацию. При появлении новых данных или исследований мы пересматриваем наши рекомендации и при необходимости вносим в них изменения.',
    },
];

export const sourceList = [
  { title: 'World Health Organization (WHO)', url: 'https://www.who.int' },
  { title: 'National Institutes of Health', url: 'https://www.nih.gov/' },
  { title: 'Centers for Disease Control and Prevention (CDC)', url: 'https://www.cdc.gov' },
  { title: 'PubMed / National Center for Biotechnology Information (NCBI)', url: 'https://pubmed.ncbi.nlm.nih.gov' },
  { title: 'Mayo Clinic', url: 'https://www.mayoclinic.org' },
  { title: 'NHS (UK National Health Service)', url: 'https://www.nhs.uk' },
  { title: 'American Diabetes Association', url: 'https://www.diabetes.org' },
  { title: 'Canadian Nutrition Society', url: 'https://cns-scn.ca' },
  { title: 'European Food Safety Authority (EFSA)', url: 'https://www.efsa.europa.eu' },
  { title: 'Australian Government Department of Health', url: 'https://www.health.gov.au' },
  { title: 'Johns Hopkins Medicine', url: 'https://www.hopkinsmedicine.org' },
  { title: 'The Nutrition Source, Harvard T.H. Chan School of Public Health', url: 'https://www.hsph.harvard.edu/nutritionsource' },
  { title: 'Food and Agriculture Organization of the United Nations', url: 'https://www.fao.org' },
  { title: 'Academy of Nutrition and Dietetics', url: 'https://www.eatright.org' },
  { title: 'European Society of Cardiology', url: 'https://www.escardio.org' },
  { title: 'Health Canada', url: 'https://www.canada.ca/en/health-canada.html' },
  { title: 'Министерство здравоохранения РФ', url: 'https://minzdrav.gov.ru/' },
  { title: 'Роспотребнадзор', url: 'https://www.rospotrebnadzor.ru/' },
  { title: 'Российское кардиологическое общество', url: 'https://scardio.ru/' },
  { title: 'НИЦ терапии и профилактической медицины Минздрава РФ', url: 'https://gnicpm.ru/' },
];
