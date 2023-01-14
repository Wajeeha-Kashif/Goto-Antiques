pragma solidity 0.5.16;

contract Data{

    struct dataentry{
    string date;
    string [3][] supply;
    uint []price;
    }

    dataentry[] private values;  //add antique
    string[2][] private user;    //user
    
    function getlengthuser() public view returns (uint){
        return user.length;
    }


    function sameaccountcheck (string memory mail) public view returns (bool){
         for(uint i = 0; i < user.length;i++){
            if (keccak256(abi.encodePacked(user[i][0])) == keccak256(abi.encodePacked(mail)))
                {
                    return true;
                }
        }
        return false;
    }


    function login(string memory val2, string memory val1) public view returns(bool)
    {
        for(uint i = 0; i < getlengthuser();i++){
            if (keccak256(abi.encodePacked(user[i][0])) == keccak256(abi.encodePacked(val2)) && keccak256(abi.encodePacked(user[i][1])) == keccak256(abi.encodePacked(val1)))
                {
                    return true;
                }
        }
        return false;
    }
    
    
    function signup(string memory mail, string memory passcode) public{
        
        user.push([mail ,passcode]);
    }

    //To check that the antique with same ID doesnot exist before
    function checksameitemnumberin(string memory _number) public view returns(bool)
    {
       for (uint i =0 ; i < values.length ; i++)
        {
            for(uint j =1 ; j< values[i].supply.length;j++)
            {
                if (keccak256(abi.encodePacked(values[i].supply[j][1])) == keccak256(abi.encodePacked(_number)))
                {
                    return true;
                    
                }

            }
            
        }
        return false;
    }

    //To Add antiques
    function dataenter(string memory _date,string memory _name, string memory _number , string memory expirydate , int _price) public{
    uint _len = values.length; 
        if(checksameitemnumberin(_number) == false)
        {
            if (_len != 0)
            {
                if (keccak256(abi.encodePacked(values[_len-1].date))   ==  keccak256(abi.encodePacked(_date)))
                {
                    values[_len-1].supply.push([_name,_number,expirydate]);
                    values[_len-1].price.push(uint(_price));  
                    }
                else
                {
                    string[3][] memory dummy = new string[3][](1) ;
                    dummy[0]=["itemname" , "itemnumber" , "expiraydate"];
                    uint[]  memory  dummyprice= new uint[](1);
                    dummyprice[0]= 1;
                    dataentry memory val = dataentry(_date,dummy,dummyprice);
                    values.push(val);
                    values[_len].supply.push([_name,_number,expirydate]);
                    values[_len].price.push(uint(_price));  

                }

            }
            else
            {
                string[3][] memory dummy = new string[3][](1) ;
                dummy[0]=["lol" , "lol1" , "lol3"];
                uint[]  memory  dummyprice= new uint[](1);
                dummyprice[0]= 1;
                dataentry memory val = dataentry(_date,dummy,dummyprice);
                values.push(val);
                values[_len].supply.push([_name,_number,expirydate]);
                values[_len].price.push(uint(_price));  
            }
        }

    }

    function getlength() public view returns(uint){
        return values.length;
    }

    //Total Sales
    //Returns the total amount that has been earned on a particular date 
    //i.e Add all the amount of antiques that were added using ADD ANTIQUES PAGE on that date
    function totalspending(string memory date) public view returns(uint){
        uint sum = 0;
        for (uint i =0 ; i < values.length ; i++)
        {
            if (keccak256(abi.encodePacked(values[i].date)) == keccak256(abi.encodePacked(date)))
            {
                for(uint j =1 ; j< values[i].price.length;j++)
                {
                    sum = sum + values[i].price[j] ;
                }
            }
        }
        return sum;    
    }

    //Total Antiques Sold
    //Returns the count of Antiques sold on particular date
    function getItemCountOnAParticularDay(string memory _date) public view returns(uint){
        for (uint i =0 ; i< values.length ; i++)
        {
             if (keccak256(abi.encodePacked(values[i].date))   ==  keccak256(abi.encodePacked(_date)))
             {
                 return values[i].supply.length-1;

             }
        }
        return 0;

    }

    //Antique Details
    function getinfo (string memory itemnumber) public view returns( string memory)
    {   
        
        for (uint i =0 ; i < values.length ; i++)
        {
            for(uint j =1 ; j< values[i].supply.length;j++)
            {
                if (keccak256(abi.encodePacked(values[i].supply[j][1])) == keccak256(abi.encodePacked(itemnumber)))
                {
                    return values[i].supply[j][2];
                    
                }

            }
            
        }
        return "Antique doesnt exsist";

    }
}
