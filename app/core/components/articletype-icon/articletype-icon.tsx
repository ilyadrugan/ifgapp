import VerifiedExpert from '../../../../assets/icons/articleTypes/verified_expert.svg';
import VerifiedResearcher from '../../../../assets/icons/articleTypes/verified_researcher.svg';
import VerifiedScience from '../../../../assets/icons/articleTypes/verified_science.svg';

export const ArticleTypeIcon = (type: string) => {
    switch (type){
        case 'verified_science':
            return <VerifiedScience />;
        case 'verified_researcher':
            return <VerifiedResearcher />;
        case 'verified_expert':
            return <VerifiedExpert />;
    }
};
