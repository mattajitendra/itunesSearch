import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryFilterService } from '../services/category-filter.service';
import { DateFilterService } from '../services/date-filter.service';
import { SearchService } from '../services/search.service';
import { distinctUntilChanged, debounceTime, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnChanges {
  @Input() categories : string[] = [];
  @Input() dates : string[] = [];
  @Output() search = new EventEmitter<string>();
  selectedCategory : string;
  selectedDate : string;
  searchField : FormControl;
  sortedDates : string[];
  constructor(private catService: CategoryFilterService,
    private dateService : DateFilterService) { 
    this.selectedCategory = '';
    this.selectedDate = '';
    this.searchField = new FormControl();
    this.sortedDates = [];
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(debounceTime(250), distinctUntilChanged(), startWith('')).subscribe(data => {
      this.search.emit(data)
    })
    this.sortedDate();
  }
  ngOnChanges(){
    this.sortedDate();
  }

  setCategory(){
    this.catService.emit(this.selectedCategory);
    console.log(this.selectedCategory);
  }
  setDate(){
    this.dateService.emit(this.selectedDate);
    console.log(this.selectedDate);
  }
  private sortedDate() {
    return this.sortedDates = this.dates.sort((a,b) =>
        new Date(b.toString()).valueOf() - new Date(a.toString()).valueOf()
    );
  }
}

