#include <iostream>
#include <string>
using namespace std;
bool authenticate(const string &username, const string &password)
{
    // Dummy authentication logic
    // return username == "user" && password == "pass";
    return true;
}

int main(int argc, char *argv[])
{
    if (argc < 3)
    {
        cerr << "Usage: " << argv[0] << " <username> <password>" << endl;
        return 1;
    }

    string username = argv[1];
    string password = argv[2];

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
