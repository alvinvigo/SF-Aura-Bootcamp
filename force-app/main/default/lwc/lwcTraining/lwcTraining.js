import { LightningElement, track, wire, api } from 'lwc';
import getLeads from '@salesforce/apex/TrainingLWCController.getLeads';
import processLead from '@salesforce/apex/TrainingLWCController.processLead';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Company from '@salesforce/schema/Lead.Company';

export default class LwcTraining extends LightningElement {
    @track messagePage = '';

    @track leads = [];

    connectedCallback() {
        const savedColumnWidths = JSON.parse(localStorage.getItem('columnWidths'));
        if (savedColumnWidths) {
            this.columnWidths = savedColumnWidths;
        }
        this.loadLeads();
    }

    loadLeads() {
        console.log('loadLeads start');
        this.leads = [];
        this.messagePage = '';

        getLeads()
            .then(result => {
                //check data leads is exist
                if (result.length > 0) {
                    console.log('result');
                    console.log(JSON.stringify(result));
                    this.leads = result.map(ld => ({
                        leadId: ld.Id,
                        fName: ld.FirstName,
                        lName: ld.LastName,
                        company: ld.Company,
                        ldStatus: ld.Status,
                        email: ld.Email,
                        source: ld.LeadSource,
                        address: ld.Address
                    }));
                    // console.log('leads');
                    // console.log(JSON.stringify(this.leads));
                } else {
                    this.messagePage = 'No Data Found';
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    //UTIL METHOD
    // resizer;
    // canMove = false;

    // handleOnMouseDown(event) {
    //     console.log('handleOnMouseDown start');

    //     event.preventDefault();
    //     this.resizer = event.currentTarget;
    //     delete this.resizer._clientX
    //     this.canMove = true;
    // }

    // handleOnMouseMove(event) {
    //     event.preventDefault();
    //     if (this.canMove) {
    //         const clientX = event.clientX;
    //         const deltaX = clientX - (this.resizer._clientX || clientX);
    //         this.resizer._clientX = clientX;
    //         const { previousElementSibling, nextElementSibling } = this.resizer
    //         // LEFT
    //         if (deltaX < 0) {
    //             const width = Math.round(parseInt(window.getComputedStyle(previousElementSibling).width) + deltaX)
    //             previousElementSibling.style.flex = `0 ${width < 10 ? 0 : width}px`
    //             nextElementSibling.style.flex = "1 0"
    //         }
    //         // RIGHT
    //         else if (deltaX > 0) {
    //             const width = Math.round(parseInt(window.getComputedStyle(nextElementSibling).width) - deltaX)
    //             nextElementSibling.style.flex = `0 ${width < 10 ? 0 : width}px`
    //             previousElementSibling.style.flex = "1 0"
    //         }
    //     }
    // }

    // handleOnMouseUp(event) {
    //     event.preventDefault();
    //     this.canMove = false;
    // }

    mouseStart = '';
    oldWidth = '';

    calculateWidth(event) {
        var childObj = event.target
        var parObj = childObj.parentNode;
        var count = 1;
        //parent element traversing to get the TH
        while (parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        console.log('final tag Name' + parObj.tagName);
        //to get the position from the left for storing the position from where user started to drag
        this.mouseStart = event.clientX;
        this.oldWidth = parObj.offsetWidth;
    }

    setNewWidth(event) {
        var childObj = event.target
        var parObj = childObj.parentNode;
        var count = 1;
        //parent element traversing to get the TH
        while (parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        //To calculate the new width of the column
        var newWidth = event.clientX - parseFloat(this.mouseStart) + parseFloat(this.oldWidth);
        parObj.style.width = newWidth + 'px';//assign new width to column
    }
}