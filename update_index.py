web= {
    'header': 'header.html',
    'footer': 'footer.html',
    'content': ''
}
def anyfunction(x:float, y:int):
    """anything descrptive information
    
    Args:
        x (float): pass in any array, called x
        y (int): pass in any array, called y

    Returns:
        float: returns the multiplication of x and y
    """

    return x*y  

def readfile(filename:str):
    """reads a file, takes in filename

    Args:
        filename (str): filepointer

    Returns:
        str: the html string
    """
    
    with open(filename, "r") as file_handle:
        file_contents = file_handle.read()
        
        return file_contents
    
def create_index(filename:str,filecontent:str):
    with open(filename,'w') as file_handle:
        file_handle.write(filecontent)

import pandas as pd
import random as r

x=list(range(1,11))
y=[r.randint(1,100)for i in x]

data={
    'x':x,
    'y':y
}

df=pd.DataFrame(data)

header_content=readfile(web['header'])
footer_content=readfile(web['footer'])
web['content']=df.to_html(index=False,table_id="sales")
index_content=header_content+web['content']+footer_content
create_index('index.html',index_content)