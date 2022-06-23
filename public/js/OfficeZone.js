class OfficeZone {
    constructor(){  
        /*
        31.7810
        -106.489

        31.7790
        -106.4875

        31.7820
        -106.4867*/

        this.first_lat = 31.7390; 
        this.first_lng =  -106.490;

        this.second_lat = 31.7410; 
        this.second_lng = -106.485;


        this.third_lat = 31.7360;
        this.third_lng = -106.485;
    }
    
    get get_first_lat(){
        return this.first_lat;
    }
    get get_first_lng(){
        return this.first_lng;
    }
    get get_second_lat(){
        return this.second_lat;
    }
    get get_second_lng(){
        return this.second_lng;
    }
    get get_third_lat(){
        return this.third_lat;
    }
    get get_third_lng(){
        return this.third_lng;
    }
}