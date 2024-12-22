import { makeAutoObservable, runInAction } from 'mobx';
import { PresentListModel, PresentViewModel } from './models/models';
import { getPresentByIdApi, getPresentsApi } from './presentsStore.api';

class PresentsStore {
  presentsList: PresentListModel = {
    current_page: 1,
    presents: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  currentPresent: PresentViewModel = {
    title: '',
    subtitle: '',
    desc: '',
    mintext: '',
    id: 0,
    winners: [],
    media: [],
  };
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor() {
   makeAutoObservable(this); // Делаем объект реактивным
  }

  clearPresents() {
    this.presentsList = {
      current_page: 1,
      presents: [],
      total: 0,
      isLoading: false,
      hasMore: true,
    };
    // this.articlesQueryParams.page =  `${articlesStore.articlesList.current_page}`;
  }
  clearCurrentPresent() {
    this.currentPresent = {
      title: '',
      subtitle: '',
      desc: '',
      mintext: '',
      id: 0,
      winners: [],
      media: [],
    };
    // this.articlesQueryParams.page =  `${articlesStore.articlesList.current_page}`;
  }
  async loadMorePresents(query?: string) {
    console.log('loadMorePresents',this.presentsList );
    if (this.presentsList.isLoading || !this.presentsList.hasMore) {return;}
    this.presentsList.isLoading = true;
    await getPresentsApi(query)
      .then((result)=>{
        console.log(result.data[0].data);
        runInAction(() => {
          this.presentsList.presents = [...this.presentsList.presents, ...result.data[0].data],
          this.presentsList.current_page += 1,
          this.presentsList.total = result.data[0].total,
          this.presentsList.hasMore = result.data[0].to < result.data[0].total;
          });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.presentsList.isLoading = false;});
  }
  async getPresentViewById(id: number) {
    console.log('getPresentViewById',this.currentPresent );
    this.isLoading = true;
    await getPresentByIdApi(id)
      .then((result)=>{
        console.log(result.data.present);
        // runInAction(() => {
          this.currentPresent = result.data.present;
          // });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.isLoading = false;});
  }
}

const presentsStore = new PresentsStore();
export default presentsStore;