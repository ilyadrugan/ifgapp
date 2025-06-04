import { makeAutoObservable, runInAction } from 'mobx';
import { CertListModel } from './models/models';
import { getCertsApi } from './certsStore.api';

class CertsStore {
  certsList: CertListModel = {
    current_page: 1,
    certs: [],
    total: 0,
    isLoading: false,
    hasMore: true,
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() {
   makeAutoObservable(this); // Делаем объект реактивным
  }

  async loadMoreCerts(query?: string) {
    if (this.certsList.isLoading || !this.certsList.hasMore) {return;}
    this.certsList.isLoading = true;
    await getCertsApi(query)
      .then((result)=>{
        console.log(result.data.certs);
        runInAction(() => {
          this.certsList.certs = [...this.certsList.certs, ...result.data.certs.data],
          this.certsList.current_page += 1,
          this.certsList.total = result.data.certs.total,
          this.certsList.hasMore = result.data.certs.to < result.data.certs.total;
          });
      }
      )
      .catch((err)=>{
        console.log('ERROR',  err.message);
        this.errorMessage = err.message;

      })
      .finally(()=>{this.certsList.isLoading = false;});
    // this.certsList.certs = certs.data;
    // this.certsList.current_page += 1;
    // this.certsList.total = certs.total;
    // this.certsList.hasMore = certs.to < certs.total;
  }


}

const certsStore = new CertsStore();
export default certsStore;
