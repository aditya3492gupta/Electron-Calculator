#include <iostream>
#include <string>
using namespace std;
bool authenticate(const string &username, const string &password)
{
    // Dummy authentication logic
    return username == "user" && password == "pass";
    // return true;
}

int main(int argc, char *argv[])
{
    // prints in the terminal
    if (argc < 3)
    {
        cerr << "Usage: " << argv[0] << " <username> <password>" << endl;
        return 1;
    }

    string username = argv[1];
    string password = argv[2];
    // message send in main for comparing
    if (authenticate(username, password))
    {
        cout << "authenticated" << endl;
    }
    else
    {
        cout << "failed" << endl;
    }

    return 0;
}

/*
in backend directory run g++ -o authenticate.exe authenticate.cpp on terminal
*/